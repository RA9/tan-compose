/**
 * `<tc-chart>` — SVG-based, themeable, responsive chart primitive.
 *
 * Five chart types in one component:
 *   - line       single or multi-series line chart
 *   - area       filled area chart (also supports stacked)
 *   - bar        grouped or stacked bar chart
 *   - sparkline  no axes / no legend — for inline mini-trends
 *   - donut      single-series proportional segments (set innerRadius=0 for pie)
 *
 * Why a custom chart component:
 *   - Chart.js / Recharts / Apex paint to `<canvas>`, so series colors,
 *     axis chrome, gridlines, and tooltips are baked into JS config rather
 *     than CSS tokens. Theming = re-instantiate.
 *   - Canvas elements expose nothing to assistive tech beyond an alt-text
 *     guess. tc-chart renders every point, bar, and segment as a real DOM
 *     element with a `<title>` and structured aria-label.
 *   - Chart.js is 200 KB before plugins. tc-chart is ~11 KB.
 *
 * Props:
 *   type         "line" | "area" | "bar" | "sparkline" | "donut"
 *                  (default "line")
 *   data         JSON — see "Data shape" below
 *   height       string  (default "240px") — any CSS length
 *   smooth       boolean (default true) — Catmull-Rom curves for line/area
 *   stacked      boolean (default false) — for area / bar
 *   showLegend   boolean (default true)
 *   showAxes     boolean (default true) — ignored for sparkline / donut
 *   showGrid     boolean (default true)
 *   showLabels   boolean (default true) — x-axis tick labels
 *   showValues   boolean (default false) — value labels on points / bars
 *   innerRadius  number  (default 0.6) — donut only; 0 → pie
 *   yMin         number? — manual y-axis minimum (auto if unset)
 *   yMax         number? — manual y-axis maximum (auto if unset)
 *   ariaLabel    string  (default "Chart")
 *   colors       JSON Array<string> — override the series palette
 *
 * Data shape (line / area / bar / sparkline):
 *   {
 *     labels: ["Jan", "Feb", "Mar"],
 *     series: [
 *       { name: "Revenue", values: [100, 150, 200] },
 *       { name: "Costs",   values: [50, 60, 70] }
 *     ]
 *   }
 *
 * Data shape (donut):
 *   {
 *     series: [
 *       { name: "A", value: 30 },
 *       { name: "B", value: 50 },
 *       { name: "C", value: 20 }
 *     ]
 *   }
 *
 * Theme variables:
 *   --tc-chart-bg, --tc-chart-fg,
 *   --tc-chart-axis, --tc-chart-grid, --tc-chart-label,
 *   --tc-chart-color-1 … --tc-chart-color-8,
 *   --tc-chart-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-chart";

export const tagName = TAG;

// ──────────────────────────────────────────────────────────────
// types
// ──────────────────────────────────────────────────────────────

interface Series {
  name: string;
  values?: number[];
  value?: number;
}

interface ChartData {
  labels?: string[];
  series: Series[];
}

interface Point {
  x: number;
  y: number;
}

// ──────────────────────────────────────────────────────────────
// helpers — math
// ──────────────────────────────────────────────────────────────

/** Round a number to a "nice" power-of-ten or half/double thereof. */
function niceNumber(range: number, round: boolean): number {
  if (range <= 0) return 1;
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction: number;
  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}

/** Produce ~`target` evenly-spaced "nice" ticks across [min, max]. */
function niceTicks(
  min: number,
  max: number,
  target = 5,
): { min: number; max: number; ticks: number[] } {
  if (min === max) {
    const pad = Math.abs(min) || 1;
    return {
      min: min - pad,
      max: max + pad,
      ticks: [min - pad, min, min + pad],
    };
  }
  const range = niceNumber(max - min, false);
  const spacing = niceNumber(range / (target - 1), true);
  const niceMin = Math.floor(min / spacing) * spacing;
  const niceMax = Math.ceil(max / spacing) * spacing;
  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + spacing * 0.5; v += spacing) {
    ticks.push(Number(v.toFixed(10)));
  }
  return { min: niceMin, max: niceMax, ticks };
}

/** Convert a series of points to an SVG path. */
function linePath(points: Point[], smooth: boolean): string {
  if (points.length === 0) return "";
  if (points.length === 1 || !smooth) {
    return "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");
  }
  // Catmull-Rom → Cubic Bezier with tension = 0.5
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/** Polar → cartesian for arc geometry (angle in radians from 12 o'clock). */
function polar(cx: number, cy: number, r: number, angle: number): Point {
  return {
    x: cx + r * Math.sin(angle),
    y: cy - r * Math.cos(angle),
  };
}

/** SVG arc path between two angles (in radians, from 12 o'clock). */
function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
): string {
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  const outerStart = polar(cx, cy, rOuter, startAngle);
  const outerEnd = polar(cx, cy, rOuter, endAngle);
  if (rInner <= 0) {
    // Pie wedge.
    return `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} ` +
      `A ${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} Z`;
  }
  const innerEnd = polar(cx, cy, rInner, endAngle);
  const innerStart = polar(cx, cy, rInner, startAngle);
  return `M ${outerStart.x} ${outerStart.y} ` +
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} ` +
    `L ${innerEnd.x} ${innerEnd.y} ` +
    `A ${rInner} ${rInner} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z`;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Compact a number for axis labels (1.2K, 3.4M, etc.). */
function fmt(n: number): string {
  if (!Number.isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (abs >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  if (abs > 0 && abs < 1) return n.toFixed(2);
  return String(Math.round(n * 100) / 100);
}

function colorFor(i: number, palette: string[]): string {
  return palette[i % palette.length];
}

// ──────────────────────────────────────────────────────────────
// renderers — one per chart type
// ──────────────────────────────────────────────────────────────

interface ChartCtx {
  data: ChartData;
  smooth: boolean;
  stacked: boolean;
  showAxes: boolean;
  showGrid: boolean;
  showLabels: boolean;
  showValues: boolean;
  innerRadius: number;
  yMin: number | null;
  yMax: number | null;
  palette: string[];
  W: number;
  H: number;
}

function renderCartesian(
  ctx: ChartCtx,
  type: "line" | "area" | "bar" | "sparkline",
): string {
  const { data, smooth, stacked, showAxes, showGrid, showLabels, showValues } =
    ctx;
  const labels = data.labels ?? [];
  const series = data.series ?? [];
  const sparkline = type === "sparkline";

  // Padding for axis labels.
  const padTop = sparkline ? 4 : 16;
  const padBottom = sparkline ? 4 : (showAxes && showLabels ? 28 : 8);
  const padLeft = sparkline ? 4 : (showAxes ? 44 : 8);
  const padRight = sparkline ? 4 : 12;
  const plotW = ctx.W - padLeft - padRight;
  const plotH = ctx.H - padTop - padBottom;

  // Compute y-range across all series (respecting stacked).
  let minY = Infinity;
  let maxY = -Infinity;
  if (stacked && series.length > 0) {
    const stackTotals = labels.length > 0
      ? labels.map((_, i) =>
        series.reduce((sum, s) => sum + (s.values?.[i] ?? 0), 0)
      )
      : [];
    for (const v of stackTotals) {
      if (v < minY) minY = v;
      if (v > maxY) maxY = v;
    }
    if (minY > 0) minY = 0;
  } else {
    for (const s of series) {
      for (const v of s.values ?? []) {
        if (v < minY) minY = v;
        if (v > maxY) maxY = v;
      }
    }
  }
  if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
    minY = 0;
    maxY = 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  const ticksInfo = niceTicks(
    ctx.yMin ?? minY,
    ctx.yMax ?? maxY,
    5,
  );
  const yLo = ctx.yMin ?? ticksInfo.min;
  const yHi = ctx.yMax ?? ticksInfo.max;
  const yRange = yHi - yLo || 1;

  const xCount = labels.length || series[0]?.values?.length || 0;

  // x position for the i-th category.
  const xAt = (i: number): number => {
    if (xCount === 1) return padLeft + plotW / 2;
    if (type === "bar") return padLeft + (i + 0.5) * (plotW / xCount);
    return padLeft + (i / (xCount - 1)) * plotW;
  };
  const yAt = (v: number): number =>
    padTop + plotH - ((v - yLo) / yRange) * plotH;

  // Grid + axis chrome.
  const chrome: string[] = [];
  if (!sparkline) {
    if (showGrid) {
      for (const t of ticksInfo.ticks) {
        const y = yAt(t);
        chrome.push(
          `<line class="grid" x1="${padLeft}" x2="${
            ctx.W - padRight
          }" y1="${y}" y2="${y}"/>`,
        );
      }
    }
    if (showAxes) {
      // Y axis labels.
      for (const t of ticksInfo.ticks) {
        const y = yAt(t);
        chrome.push(
          `<text class="axis-label y" x="${
            padLeft - 8
          }" y="${y}" text-anchor="end" dominant-baseline="middle">${
            esc(fmt(t))
          }</text>`,
        );
      }
      // X axis labels.
      if (showLabels && labels.length > 0) {
        const stride = Math.max(1, Math.ceil(labels.length / 8));
        labels.forEach((lab, i) => {
          if (i % stride !== 0 && i !== labels.length - 1) return;
          chrome.push(
            `<text class="axis-label x" x="${xAt(i)}" y="${
              ctx.H - padBottom + 16
            }" text-anchor="middle">${esc(lab)}</text>`,
          );
        });
      }
      // Baseline (the y=0 or y=min axis).
      const baselineY = yLo <= 0 && yHi >= 0 ? yAt(0) : yAt(yLo);
      chrome.push(
        `<line class="axis" x1="${padLeft}" x2="${
          ctx.W - padRight
        }" y1="${baselineY}" y2="${baselineY}"/>`,
      );
    }
  }

  // Series rendering.
  const layers: string[] = [];

  if (type === "bar") {
    // Group width per category; bars are either grouped (side-by-side) or
    // stacked (top-down within the group's width).
    const groupW = plotW / xCount;
    const innerPad = groupW * 0.18;
    const usableW = groupW - innerPad * 2;
    series.forEach((s, si) => {
      const cls = `series series-${si}`;
      const color = colorFor(si, ctx.palette);
      let stackSoFar = 0; // for stacked
      s.values?.forEach((v, i) => {
        if (!Number.isFinite(v)) return;
        const xCenter = xAt(i);
        let x: number;
        let w: number;
        let y: number;
        let h: number;
        if (stacked) {
          x = xCenter - usableW / 2;
          w = usableW;
          const yTop = yAt(stackSoFar + v);
          const yBase = yAt(stackSoFar);
          y = Math.min(yTop, yBase);
          h = Math.abs(yTop - yBase);
          stackSoFar += v;
        } else {
          const slot = usableW / series.length;
          x = xCenter - usableW / 2 + si * slot;
          w = slot * 0.86;
          const yV = yAt(v);
          const yBase = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          y = Math.min(yV, yBase);
          h = Math.abs(yV - yBase);
        }
        const title = `${esc(s.name)}${
          labels[i] ? ` · ${esc(labels[i])}` : ""
        }: ${esc(fmt(v))}`;
        layers.push(
          `<g class="${cls}">` +
            `<rect class="hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}" data-tip="${title}" data-color="${color}"><title>${title}</title></rect>` +
            (showValues
              ? `<text class="value-label" x="${x + w / 2}" y="${
                y - 4
              }" text-anchor="middle">${esc(fmt(v))}</text>`
              : "") +
            `</g>`,
        );
      });
    });
  } else {
    // line / area / sparkline
    if (stacked && type === "area") {
      // Stack from bottom up; each series's "top" is the running total.
      const runningTotals: number[] = new Array(xCount).fill(0);
      series.forEach((s, si) => {
        const color = colorFor(si, ctx.palette);
        const topPts: Point[] = [];
        const bottomPts: Point[] = [];
        for (let i = 0; i < xCount; i++) {
          const v = s.values?.[i] ?? 0;
          const top = runningTotals[i] + v;
          topPts.push({ x: xAt(i), y: yAt(top) });
          bottomPts.push({ x: xAt(i), y: yAt(runningTotals[i]) });
          runningTotals[i] = top;
        }
        const fillPath = linePath(topPts, smooth) +
          " L " + bottomPts.slice().reverse().map((p) => `${p.x} ${p.y}`)
          .join(" L ") + " Z";
        layers.push(
          `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25" pointer-events="none"/>`,
        );
        layers.push(
          `<path class="series-line series-${si}" d="${
            linePath(topPts, smooth)
          }" stroke="${color}" fill="none" pointer-events="none"/>`,
        );
        // Hit targets along the stacked top so hover works on stacked area.
        topPts.forEach((p, i) => {
          const v = s.values?.[i] ?? 0;
          const title = `${esc(s.name)}${
            labels[i] ? ` · ${esc(labels[i])}` : ""
          }: ${esc(fmt(v))}`;
          layers.push(
            `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}"><title>${title}</title></circle>`,
          );
        });
      });
    } else {
      series.forEach((s, si) => {
        const color = colorFor(si, ctx.palette);
        const pts: Point[] = (s.values ?? []).map((v, i) => ({
          x: xAt(i),
          y: yAt(v),
        }));
        const d = linePath(pts, smooth);
        if (type === "area") {
          const baseY = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          const fillPath = d +
            ` L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;
          layers.push(
            `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25"/>`,
          );
        }
        layers.push(
          `<path class="series-line series-${si}" d="${d}" stroke="${color}" fill="none"/>`,
        );
        if (!sparkline) {
          pts.forEach((p, i) => {
            const v = s.values?.[i];
            const title = `${esc(s.name)}${
              labels[i] ? ` · ${esc(labels[i])}` : ""
            }: ${esc(fmt(v ?? 0))}`;
            // Visible point — pointer-events none so it doesn't intercept;
            // the bigger transparent hit circle below catches the hover.
            layers.push(
              `<circle class="series-point series-${si}" cx="${p.x}" cy="${p.y}" r="3.5" fill="${color}" pointer-events="none"/>`,
            );
            layers.push(
              `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}"><title>${title}</title></circle>`,
            );
            if (showValues) {
              layers.push(
                `<text class="value-label" x="${p.x}" y="${
                  p.y - 8
                }" text-anchor="middle" pointer-events="none">${
                  esc(fmt(v ?? 0))
                }</text>`,
              );
            }
          });
        }
      });
    }
  }

  return chrome.join("") + layers.join("");
}

function renderDonut(ctx: ChartCtx): string {
  const series = ctx.data.series ?? [];
  const total = series.reduce((s, x) => s + (x.value ?? 0), 0);
  if (total <= 0) return "";
  const cx = ctx.W / 2;
  const cy = ctx.H / 2;
  const r = Math.min(ctx.W, ctx.H) / 2 - 4;
  const inner = Math.max(0, Math.min(0.9, ctx.innerRadius)) * r;
  let angle = 0;
  const out: string[] = [];
  series.forEach((s, i) => {
    const value = s.value ?? 0;
    if (value <= 0) return;
    const sweep = (value / total) * Math.PI * 2;
    const start = angle;
    const end = angle + sweep;
    // Tiny gap between segments using a slightly inset arc — visual polish.
    const path = arcPath(cx, cy, r, inner, start, end - 0.01);
    const color = colorFor(i, ctx.palette);
    const pct = ((value / total) * 100).toFixed(1).replace(/\.0$/, "");
    const title = `${esc(s.name)}: ${esc(fmt(value))} (${pct}%)`;
    out.push(
      `<path class="series-segment hit series-${i}" d="${path}" fill="${color}" data-tip="${title}" data-color="${color}"><title>${title}</title></path>`,
    );
    if (ctx.showValues) {
      const mid = (start + end) / 2;
      const labelR = (r + inner) / 2;
      const p = polar(cx, cy, labelR, mid);
      out.push(
        `<text class="value-label donut" x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="middle">${
          esc(pct)
        }%</text>`,
      );
    }
    angle = end;
  });
  return out.join("");
}

function renderLegend(series: Series[], palette: string[]): string {
  if (series.length === 0) return "";
  return `<div class="legend" part="legend">` +
    series.map((s, i) => {
      const color = colorFor(i, palette);
      return `<span class="legend-item"><span class="swatch" style="background:${color}"></span>${
        esc(s.name)
      }</span>`;
    }).join("") +
    `</div>`;
}

function ariaDescription(type: string, data: ChartData): string {
  if (type === "donut") {
    const total = (data.series ?? []).reduce((s, x) => s + (x.value ?? 0), 0);
    const parts = (data.series ?? [])
      .filter((s) => (s.value ?? 0) > 0)
      .map((s) => {
        const pct = total > 0 ? ((s.value ?? 0) / total) * 100 : 0;
        return `${s.name} ${pct.toFixed(1).replace(/\.0$/, "")}%`;
      });
    return `Donut chart: ${parts.join(", ")}.`;
  }
  const seriesNames = (data.series ?? []).map((s) => s.name).join(", ");
  const ptCount = data.labels?.length ?? data.series[0]?.values?.length ?? 0;
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} chart with ${
    (data.series ?? []).length
  } series (${seriesNames}) and ${ptCount} data point${
    ptCount === 1 ? "" : "s"
  }.`;
}

// ──────────────────────────────────────────────────────────────
// Declared BEFORE build() — see kit/components/button.ts:33-38 for the
// var-after-build TDZ rationale.
// ──────────────────────────────────────────────────────────────

const DEFAULT_PALETTE = [
  "var(--tc-chart-color-1, var(--tc-color-accent, #a16939))",
  "var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))",
  "var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))",
  "var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))",
  "var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))",
  "var(--tc-chart-color-6, #6f4e7c)",
  "var(--tc-chart-color-7, #0b6e6e)",
  "var(--tc-chart-color-8, #b0566c)",
];

const CHART_STYLE = `
  <style>
    :host { display: block; width: 100%; }
    .root {
      width: 100%;
      font-family: var(--tc-chart-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
      background: var(--tc-chart-bg, transparent);
    }
    .canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .tip {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      background: var(--tc-chart-tooltip-bg, var(--tc-color-ink, #14171f));
      color: var(--tc-chart-tooltip-fg, #ffffff);
      font-size: 0.78rem;
      line-height: 1.35;
      padding: 6px 10px;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      white-space: nowrap;
      opacity: 0;
      transform: translate(-9999px, -9999px);
      transition: opacity 0.1s ease;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-family: var(--tc-chart-font);
    }
    .tip[data-open="1"] { opacity: 1; }
    .tip-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex: 0 0 auto;
      background: currentColor;
    }
    /* hit targets — invisible enlarged grab zones */
    .hit { cursor: default; }

    /* Loading / error overlay used while a src= fetch is in flight. */
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.86rem;
      color: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
      background: color-mix(in srgb, var(--tc-chart-bg, var(--tc-color-surface, #ffffff)) 88%, transparent);
      border-radius: inherit;
      pointer-events: none;
    }
    .overlay.loading::before {
      content: "";
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 2px solid var(--tc-chart-grid, #ece5d3);
      border-top-color: var(--tc-color-accent, #a16939);
      animation: tc-chart-spin 0.8s linear infinite;
    }
    .overlay.error {
      color: var(--tc-color-danger-fg, #7a1a14);
    }
    .overlay.error small {
      font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
      font-size: 0.74rem;
      opacity: 0.8;
    }
    @keyframes tc-chart-spin {
      to { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .overlay.loading::before { animation-duration: 3s; }
    }
    svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .grid {
      stroke: var(--tc-chart-grid, var(--tc-color-rule, #ece5d3));
      stroke-width: 1;
      stroke-dasharray: 2 4;
      fill: none;
    }
    .axis {
      stroke: var(--tc-chart-axis, var(--tc-color-rule-strong, #d9cfb8));
      stroke-width: 1;
      fill: none;
    }
    .axis-label {
      font-size: 11px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
      font-variant-numeric: tabular-nums;
    }
    .value-label {
      font-size: 10px;
      font-weight: 600;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .value-label.donut { fill: #fff; }
    .series-line {
      stroke-width: 2;
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .series-point {
      stroke: var(--tc-chart-bg, var(--tc-color-surface, #ffffff));
      stroke-width: 2;
      transition: r 0.12s ease;
      cursor: default;
    }
    .series-point:hover { r: 5; }
    .series-segment {
      stroke: var(--tc-chart-bg, var(--tc-color-surface, #ffffff));
      stroke-width: 2;
      transition: transform 0.15s ease;
      transform-origin: center;
      transform-box: fill-box;
    }
    .series-segment:hover { transform: scale(1.03); }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      margin-top: 12px;
      font-size: 0.86rem;
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .swatch {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .series-point, .series-segment { transition: none; }
    }
  </style>
`;

build(
  TAG,
  describe({
    props: {
      type: { type: "string", default: "line" },
      data: { type: "json", default: { series: [] } },
      height: { type: "string", default: "240px" },
      smooth: { type: "boolean", default: true },
      stacked: { type: "boolean", default: false },
      showLegend: { type: "boolean", default: true },
      showAxes: { type: "boolean", default: true },
      showGrid: { type: "boolean", default: true },
      showLabels: { type: "boolean", default: true },
      showValues: { type: "boolean", default: false },
      innerRadius: { type: "number", default: 0.6 },
      yMin: { type: "json", default: null },
      yMax: { type: "json", default: null },
      ariaLabel: { type: "string", default: "Chart" },
      colors: { type: "json", default: null },
      // Server-side data: fetch JSON from `src` and use it as `data`.
      // If `data` is set explicitly it always wins. `srcKey` lets the
      // chart drill into the response (e.g. "results.population" maps to
      // `json.results.population`). `loadingText` and `errorText` are
      // shown inside the chart while the fetch is pending / failed.
      src: { type: "string", default: "" },
      srcKey: { type: "string", default: "" },
      loadingText: { type: "string", default: "Loading chart…" },
      errorText: { type: "string", default: "Couldn't load chart data" },
    },
    theme: {
      "tc-chart-bg": "transparent",
      "tc-chart-fg": "var(--tc-color-ink, #14171f)",
      "tc-chart-axis": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-chart-grid": "var(--tc-color-rule, #ece5d3)",
      "tc-chart-label": "var(--tc-color-ink-muted, #6b7280)",
      "tc-chart-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: { display: "block" },
    template: ({ props, state }) => {
      const rawType = String(props.type ?? "line").toLowerCase();
      const type =
        (["line", "area", "bar", "sparkline", "donut"].includes(rawType)
          ? rawType
          : "line") as "line" | "area" | "bar" | "sparkline" | "donut";
      // Resolution: explicit `data` wins, then the cache from a `src`
      // fetch, then an empty placeholder.
      const explicitData = props.data as ChartData | undefined;
      const fetchedData = state.fetched as ChartData | undefined;
      const hasExplicit = !!explicitData &&
        Array.isArray(explicitData.series) && explicitData.series.length > 0;
      const data = hasExplicit
        ? explicitData!
        : (fetchedData ?? { series: [] });
      const src = String(props.src ?? "");
      const loading = !!state.loading && !hasExplicit && !fetchedData;
      const error = src && state.error ? String(state.error) : "";
      const stateOverlay = loading
        ? `<div class="overlay loading">${
          esc(String(props.loadingText ?? "Loading chart…"))
        }</div>`
        : error
        ? `<div class="overlay error" role="alert">${
          esc(String(props.errorText ?? "Couldn't load chart data"))
        }<small>${esc(error)}</small></div>`
        : "";
      const isSparkline = type === "sparkline";
      const isDonut = type === "donut";

      const customColors = props.colors as string[] | null | undefined;
      const palette = Array.isArray(customColors) && customColors.length > 0
        ? customColors
        : DEFAULT_PALETTE;

      const W = isDonut ? 320 : 800;
      const H = isDonut ? 320 : 400;

      const ctx: ChartCtx = {
        data,
        smooth: !!props.smooth,
        stacked: !!props.stacked,
        showAxes: !!props.showAxes,
        showGrid: !!props.showGrid,
        showLabels: !!props.showLabels,
        showValues: !!props.showValues,
        innerRadius: Number(props.innerRadius ?? 0.6),
        yMin: props.yMin == null ? null : Number(props.yMin),
        yMax: props.yMax == null ? null : Number(props.yMax),
        palette,
        W,
        H,
      };

      const body = isDonut ? renderDonut(ctx) : renderCartesian(ctx, type);

      const desc = ariaDescription(type, data);
      const height = esc(String(props.height ?? "240px"));

      return `
        <div class="root" role="img" aria-label="${
        esc(props.ariaLabel ?? "Chart")
      }">
          <div class="canvas" style="height:${height};">
            <svg
              viewBox="0 0 ${W} ${H}"
              preserveAspectRatio="${isDonut ? "xMidYMid meet" : "none"}"
              aria-hidden="true"
            >${body}</svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${stateOverlay}
          </div>
          ${
        props.showLegend && !isSparkline && data.series &&
          data.series.length > 0
          ? renderLegend(data.series, palette)
          : ""
      }
          <span class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;">${
        esc(desc)
      }</span>
        </div>
        ${CHART_STYLE}
      `;
    },
    afterMount() {
      installChartHover(this as HTMLElement);
      maybeFetch(this as HTMLElement);
    },
    afterRender() {
      // Re-render rebuilds the shadow DOM, so the hit elements are new
      // each time. Re-wire the (idempotent) listener after every render.
      installChartHover(this as HTMLElement);
      maybeFetch(this as HTMLElement);
    },
    unmount() {
      const host = this as HTMLElement & {
        _chartHoverCleanup?: () => void;
        _chartFetchAborter?: AbortController;
      };
      host._chartHoverCleanup?.();
      host._chartFetchAborter?.abort();
    },
  }),
);

/**
 * Wire up the cursor-following tooltip on a tc-chart host. Reads
 * `data-tip` (text) and `data-color` (CSS color for the swatch) off
 * any `.hit` element under the pointer; positions the .tip div near
 * the cursor and toggles it open/closed.
 *
 * Safe to call multiple times — stashes its cleanup on the host so
 * older listeners are torn down before new ones are attached. That
 * makes it idempotent across re-renders.
 */
function installChartHover(host: HTMLElement): void {
  const h = host as HTMLElement & {
    _chartHoverCleanup?: () => void;
    shadowRoot?: ShadowRoot | null;
  };
  h._chartHoverCleanup?.();

  const root = h.shadowRoot;
  if (!root) return;
  const canvas = root.querySelector(".canvas") as HTMLElement | null;
  const tip = root.querySelector(".tip") as HTMLElement | null;
  const tipText = tip?.querySelector(".tip-text") as HTMLElement | null;
  const tipSwatch = tip?.querySelector(".tip-swatch") as HTMLElement | null;
  if (!canvas || !tip || !tipText || !tipSwatch) return;

  const hide = () => {
    tip.removeAttribute("data-open");
    tip.style.transform = "translate(-9999px, -9999px)";
  };

  const onMove = (e: PointerEvent) => {
    const target = (e.target as Element | null)?.closest?.(
      "[data-tip]",
    ) as HTMLElement | null;
    if (!target) {
      hide();
      return;
    }
    const text = target.getAttribute("data-tip") || "";
    const color = target.getAttribute("data-color") || "currentColor";
    tipText.textContent = text;
    tipSwatch.style.background = color;

    // Position relative to .canvas. Offset so the tip doesn't sit
    // under the cursor; flip to the left if it would overflow.
    const rect = canvas.getBoundingClientRect();
    const tw = tip.offsetWidth || 100;
    const th = tip.offsetHeight || 24;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let x = px + 12;
    let y = py - th - 8;
    if (x + tw > rect.width - 4) x = px - tw - 12;
    if (y < 4) y = py + 16;
    tip.style.transform = `translate(${x}px, ${y}px)`;
    tip.setAttribute("data-open", "1");
  };

  const onLeave = () => hide();

  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);

  h._chartHoverCleanup = () => {
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerleave", onLeave);
    hide();
  };
}

/**
 * If the host has a `src` prop and we haven't fetched that URL yet,
 * kick off a fetch. Stores progress in state (`loading`, `error`,
 * `fetched`, `fetchedFrom`) so the template can paint the spinner /
 * error overlay and switch to the resolved data when it lands.
 *
 * Idempotent: the `fetchedFrom` guard skips re-fetching when the
 * component re-renders for unrelated reasons. A `src` change drops
 * the cached fetched data so the next render shows the loader again.
 */
function maybeFetch(rawHost: HTMLElement): void {
  const host = rawHost as HTMLElement & {
    src?: string;
    srcKey?: string;
    getState?: (k: string) => unknown;
    setState?: (k: string, v: unknown) => void;
    _chartFetchAborter?: AbortController;
  };
  const src = String(host.src ?? "").trim();
  if (!src) return;
  if (!host.getState || !host.setState) return;

  const last = host.getState("fetchedFrom") as string | undefined;
  if (last === src) return;

  // New URL → drop stale results so the overlay shows immediately.
  host._chartFetchAborter?.abort();
  const aborter = new AbortController();
  host._chartFetchAborter = aborter;

  host.setState("fetchedFrom", src);
  host.setState("fetched", null);
  host.setState("error", null);
  host.setState("loading", true);

  const key = String(host.srcKey ?? "").trim();
  fetch(src, { signal: aborter.signal })
    .then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.json();
    })
    .then((json: unknown) => {
      const resolved = key ? getByPath(json, key) : json;
      if (
        !resolved || typeof resolved !== "object" ||
        !Array.isArray((resolved as ChartData).series)
      ) {
        throw new Error(
          key
            ? `Payload at "${key}" doesn't look like ChartData`
            : `Payload doesn't look like ChartData`,
        );
      }
      if (aborter.signal.aborted) return;
      host.setState!("fetched", resolved);
      host.setState!("loading", false);
    })
    .catch((err: unknown) => {
      if (aborter.signal.aborted) return;
      host.setState!("loading", false);
      host.setState!(
        "error",
        err instanceof Error ? err.message : String(err),
      );
    });
}

/** Walk a dot-separated path through a plain JSON value. */
function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>(
    (
      o,
      k,
    ) => (o && typeof o === "object"
      ? (o as Record<string, unknown>)[k]
      : undefined),
    obj,
  );
}
