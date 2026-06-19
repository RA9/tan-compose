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

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-chart";

export const tagName = TAG;

// ──────────────────────────────────────────────────────────────
// types
// ──────────────────────────────────────────────────────────────

interface Series {
  name: string;
  /** Numeric values; `null` is rendered as a gap (line breaks, no point/bar). */
  values?: (number | null)[];
  value?: number;
  /** Per-series overrides (line/area/bar). */
  color?: string;
  /** SVG stroke-dasharray for the line, e.g. "6 6". */
  dash?: string;
  /** Line stroke width in px (default 2). */
  width?: number;
  /** Fill/line opacity 0–1. */
  opacity?: number;
  /** Draw point markers on line/area (default true for line/area). */
  showPoints?: boolean;
}

interface RefLine {
  axis?: "x" | "y";
  value: number;
  label?: string;
  dash?: string;
  color?: string;
}

interface ChartData {
  labels?: string[];
  series: Series[];
}

type ValueFormat =
  | "compact"
  | "integer"
  | "percent"
  | "currency"
  | "none"
  | string;

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

/**
 * Build a value formatter from a token. `compact` (default) is the K/M
 * shortener; `integer` adds thousands separators; `percent` appends %;
 * `currency` prefixes $ (compacted); `none` is the raw number. Anything
 * else is treated as a unit suffix appended to the compact form
 * (e.g. valueFormat="%" or " kWh").
 */
function makeFormatter(token: ValueFormat): (n: number) => string {
  switch (token) {
    case "compact":
      return fmt;
    case "none":
      return (n) => (Number.isFinite(n) ? String(n) : "");
    case "integer":
      return (n) => Number.isFinite(n) ? Math.round(n).toLocaleString() : "";
    case "percent":
      return (n) => Number.isFinite(n) ? `${fmt(n)}%` : "";
    case "currency":
      return (n) => Number.isFinite(n) ? `$${fmt(n)}` : "";
    default:
      // Treat as a literal unit suffix on the compact form.
      return (n) => Number.isFinite(n) ? `${fmt(n)}${token}` : "";
  }
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
  /** "vertical" (default) or "horizontal" — bar charts only. */
  orientation: "vertical" | "horizontal";
  /** Force a fixed x-label stride (0 = auto). */
  labelStride: number;
  /** Cap the number of x labels shown (0 = no cap beyond stride). */
  maxLabels: number;
  /** Rotate x-axis tick labels by this many degrees (0 = none). */
  labelAngle: number;
  /** Threshold / marker lines. */
  refLines: RefLine[];
  /** Formats data values (tooltips, value labels). */
  fmtV: (n: number) => string;
  /** Formats axis ticks. */
  fmtTick: (n: number) => string;
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
        if (v == null || !Number.isFinite(v)) continue; // skip gaps
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
            esc(ctx.fmtTick(t))
          }</text>`,
        );
      }
      // X axis labels. Density: explicit labelStride wins; else cap to
      // maxLabels; else the legacy ~8 auto-thin. labelAngle rotates ticks.
      if (showLabels && labels.length > 0) {
        const stride = ctx.labelStride > 0
          ? ctx.labelStride
          : ctx.maxLabels > 0
          ? Math.max(1, Math.ceil(labels.length / ctx.maxLabels))
          : Math.max(1, Math.ceil(labels.length / 8));
        const ang = ctx.labelAngle;
        const anchor = ang === 0 ? "middle" : ang < 0 ? "end" : "start";
        labels.forEach((lab, i) => {
          if (i % stride !== 0 && i !== labels.length - 1) return;
          const lx = xAt(i);
          const ly = ctx.H - padBottom + 16;
          const transform = ang !== 0
            ? ` transform="rotate(${ang} ${lx} ${ly})"`
            : "";
          chrome.push(
            `<text class="axis-label x" x="${lx}" y="${ly}" text-anchor="${anchor}"${transform}>${
              esc(lab)
            }</text>`,
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
      const color = s.color || colorFor(si, ctx.palette);
      const fo = s.opacity != null ? ` fill-opacity="${s.opacity}"` : "";
      let stackSoFar = 0; // for stacked
      s.values?.forEach((v, i) => {
        if (v == null || !Number.isFinite(v)) return; // null → gap (no bar)
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
        }: ${esc(ctx.fmtV(v))}`;
        const data = `data-tip="${title}" data-color="${color}" data-series="${
          esc(s.name)
        }" data-index="${i}" data-value="${v}" data-label="${
          esc(labels[i] ?? "")
        }"`;
        const barDelay = (i * 0.04).toFixed(3);
        layers.push(
          `<g class="${cls}">` +
            `<rect class="hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}"${fo} ${data} style="animation-delay: ${barDelay}s"><title>${title}</title></rect>` +
            (showValues
              ? `<text class="value-label" x="${x + w / 2}" y="${
                y - 4
              }" text-anchor="middle">${esc(ctx.fmtV(v))}</text>`
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
        const color = s.color || colorFor(si, ctx.palette);
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
        const stackedDelay = (si * 0.15).toFixed(3);
        layers.push(
          `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25" pointer-events="none" style="animation-delay: ${stackedDelay}s"/>`,
        );
        layers.push(
          `<path class="series-line series-${si}" d="${
            linePath(topPts, smooth)
          }" stroke="${color}" fill="none" pointer-events="none" style="animation-delay: ${stackedDelay}s"/>`,
        );
        // Hit targets along the stacked top so hover works on stacked area.
        topPts.forEach((p, i) => {
          const v = s.values?.[i] ?? 0;
          const title = `${esc(s.name)}${
            labels[i] ? ` · ${esc(labels[i])}` : ""
          }: ${esc(ctx.fmtV(v))}`;
          layers.push(
            `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}" data-series="${
              esc(s.name)
            }" data-index="${i}" data-value="${v}" data-label="${
              esc(labels[i] ?? "")
            }"><title>${title}</title></circle>`,
          );
        });
      });
    } else {
      series.forEach((s, si) => {
        const color = s.color || colorFor(si, ctx.palette);
        const vals = s.values ?? [];
        const seriesDelay = (si * 0.15).toFixed(3);

        // Per-series style → CSS vars (presentation attrs lose to our CSS).
        const styleBits = [`animation-delay: ${seriesDelay}s`];
        if (s.width != null) styleBits.push(`--tc-sw: ${s.width}`);
        if (s.opacity != null) styleBits.push(`--tc-so: ${s.opacity}`);
        if (s.dash) styleBits.push(`--tc-dash: ${esc(s.dash)}`);
        const lineStyle = styleBits.join("; ");
        const lineCls = `series-line series-${si}${
          s.dash ? " custom-dash" : ""
        }`;
        const fillOp = s.opacity != null ? Number(s.opacity) * 0.25 : 0.25;

        // Split values into contiguous runs; a null/NaN is a gap that
        // breaks the line (and fill) rather than producing NaN coords.
        const runs: Point[][] = [];
        let run: Point[] = [];
        vals.forEach((v, i) => {
          if (v == null || !Number.isFinite(v)) {
            if (run.length) runs.push(run);
            run = [];
            return;
          }
          run.push({ x: xAt(i), y: yAt(v) });
        });
        if (run.length) runs.push(run);

        if (type === "area") {
          const baseY = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          for (const r of runs) {
            const fillPath = linePath(r, smooth) +
              ` L ${r[r.length - 1].x} ${baseY} L ${r[0].x} ${baseY} Z`;
            layers.push(
              `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="${fillOp}" pointer-events="none" style="animation-delay: ${seriesDelay}s"/>`,
            );
          }
        }
        for (const r of runs) {
          layers.push(
            `<path class="${lineCls}" d="${
              linePath(r, smooth)
            }" stroke="${color}" fill="none" style="${lineStyle}"/>`,
          );
        }

        if (!sparkline) {
          const showPts = s.showPoints !== false;
          vals.forEach((v, i) => {
            if (v == null || !Number.isFinite(v)) return; // skip gaps
            const p = { x: xAt(i), y: yAt(v) };
            const title = `${esc(s.name)}${
              labels[i] ? ` · ${esc(labels[i])}` : ""
            }: ${esc(ctx.fmtV(v))}`;
            const data =
              `data-tip="${title}" data-color="${color}" data-series="${
                esc(s.name)
              }" data-index="${i}" data-value="${v}" data-label="${
                esc(labels[i] ?? "")
              }"`;
            const pointDelay = (si * 0.15 + i * 0.025 + 0.55).toFixed(3);
            if (showPts) {
              layers.push(
                `<circle class="series-point series-${si}" cx="${p.x}" cy="${p.y}" r="3.5" fill="${color}" pointer-events="none" style="animation-delay: ${pointDelay}s"/>`,
              );
            }
            layers.push(
              `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" ${data}><title>${title}</title></circle>`,
            );
            if (showValues) {
              layers.push(
                `<text class="value-label" x="${p.x}" y="${
                  p.y - 8
                }" text-anchor="middle" pointer-events="none">${
                  esc(ctx.fmtV(v))
                }</text>`,
              );
            }
          });
        }
      });
    }
  }

  // Reference lines (thresholds / markers), drawn over the series.
  layers.push(renderRefLines(ctx, xAt, yAt, xCount));

  return chrome.join("") + layers.join("");
}

/**
 * Render threshold / marker lines. axis:"y" draws a horizontal line across
 * the plot at the data value; axis:"x" draws a vertical line at the given
 * category index. Optional dashed style, color, and a label.
 */
function renderRefLines(
  ctx: ChartCtx,
  xAt: (i: number) => number,
  yAt: (v: number) => number,
  _xCount: number,
): string {
  if (!Array.isArray(ctx.refLines) || ctx.refLines.length === 0) return "";
  const padLeft = 44;
  const padRight = 12;
  const out: string[] = [];
  for (const ref of ctx.refLines) {
    if (!ref || !Number.isFinite(ref.value)) continue;
    const axis = ref.axis === "x" ? "x" : "y";
    const color = ref.color ||
      "var(--tc-chart-axis, var(--tc-color-ink-muted, #6b7280))";
    const dash = ref.dash ?? "5 4";
    if (axis === "y") {
      const y = yAt(ref.value);
      out.push(
        `<line class="ref-line" x1="${padLeft}" x2="${
          ctx.W - padRight
        }" y1="${y}" y2="${y}" stroke="${color}" stroke-dasharray="${
          esc(dash)
        }"/>`,
      );
      if (ref.label) {
        out.push(
          `<text class="ref-label" x="${ctx.W - padRight}" y="${
            y - 4
          }" text-anchor="end">${esc(ref.label)}</text>`,
        );
      }
    } else {
      const x = xAt(ref.value);
      out.push(
        `<line class="ref-line" x1="${x}" x2="${x}" y1="16" y2="${
          ctx.H - (ctx.showAxes && ctx.showLabels ? 28 : 8)
        }" stroke="${color}" stroke-dasharray="${esc(dash)}"/>`,
      );
      if (ref.label) {
        out.push(
          `<text class="ref-label" x="${x + 4}" y="22" text-anchor="start">${
            esc(ref.label)
          }</text>`,
        );
      }
    }
  }
  return out.join("");
}

/**
 * Horizontal bar chart. Categories run down the Y-axis (every label shown,
 * left-aligned) and values run along the X-axis — the natural fit for
 * ranking and for many categories where vertical labels would collide or be
 * thinned away. Supports grouped and stacked, per-series color/opacity,
 * value labels, and reference lines (drawn as vertical value thresholds).
 */
function renderHorizontalBars(ctx: ChartCtx): string {
  const { data, stacked, showAxes, showGrid, showLabels, showValues } = ctx;
  const labels = data.labels ?? [];
  const series = data.series ?? [];
  const rowCount = labels.length || series[0]?.values?.length || 0;
  if (rowCount === 0) return "";

  const padTop = 16;
  const padBottom = showAxes ? 28 : 12;
  const padLeft = showLabels ? 130 : 12;
  const padRight = 16;
  const plotW = ctx.W - padLeft - padRight;
  const plotH = ctx.H - padTop - padBottom;

  // Value range along the X-axis.
  let minV = Infinity;
  let maxV = -Infinity;
  if (stacked && series.length > 0) {
    for (let i = 0; i < rowCount; i++) {
      const tot = series.reduce((sum, s) => sum + (s.values?.[i] ?? 0), 0);
      if (tot < minV) minV = tot;
      if (tot > maxV) maxV = tot;
    }
  } else {
    for (const s of series) {
      for (const v of s.values ?? []) {
        if (v == null || !Number.isFinite(v)) continue;
        if (v < minV) minV = v;
        if (v > maxV) maxV = v;
      }
    }
  }
  if (!Number.isFinite(minV) || !Number.isFinite(maxV)) {
    minV = 0;
    maxV = 1;
  }
  if (minV === maxV) {
    minV -= 1;
    maxV += 1;
  }
  if (minV > 0) minV = 0; // bars read from a zero baseline

  const ticksInfo = niceTicks(ctx.yMin ?? minV, ctx.yMax ?? maxV, 5);
  const vLo = ctx.yMin ?? ticksInfo.min;
  const vHi = ctx.yMax ?? ticksInfo.max;
  const vRange = vHi - vLo || 1;

  const xAtV = (v: number): number => padLeft + ((v - vLo) / vRange) * plotW;
  const rowH = plotH / rowCount;
  const rowY = (i: number): number => padTop + (i + 0.5) * rowH;

  const chrome: string[] = [];
  if (showGrid) {
    for (const t of ticksInfo.ticks) {
      const x = xAtV(t);
      chrome.push(
        `<line class="grid" x1="${x}" x2="${x}" y1="${padTop}" y2="${
          padTop + plotH
        }"/>`,
      );
    }
  }
  if (showAxes) {
    for (const t of ticksInfo.ticks) {
      const x = xAtV(t);
      chrome.push(
        `<text class="axis-label x" x="${x}" y="${
          ctx.H - padBottom + 16
        }" text-anchor="middle">${esc(ctx.fmtTick(t))}</text>`,
      );
    }
    if (showLabels) {
      labels.forEach((lab, i) => {
        chrome.push(
          `<text class="bar-cat-label" x="${padLeft - 8}" y="${
            rowY(i)
          }" text-anchor="end" dominant-baseline="middle">${esc(lab)}</text>`,
        );
      });
    }
    const baseX = vLo <= 0 && vHi >= 0 ? xAtV(0) : xAtV(vLo);
    chrome.push(
      `<line class="axis" x1="${baseX}" x2="${baseX}" y1="${padTop}" y2="${
        padTop + plotH
      }"/>`,
    );
  }

  const layers: string[] = [];
  const innerPad = rowH * 0.18;
  const usableH = rowH - innerPad * 2;
  series.forEach((s, si) => {
    const color = s.color || colorFor(si, ctx.palette);
    const fo = s.opacity != null ? ` fill-opacity="${s.opacity}"` : "";
    let stackSoFar = 0;
    s.values?.forEach((v, i) => {
      if (v == null || !Number.isFinite(v)) return;
      const yCenter = rowY(i);
      let x: number;
      let y: number;
      let w: number;
      let h: number;
      if (stacked) {
        y = yCenter - usableH / 2;
        h = usableH;
        const xStart = xAtV(stackSoFar);
        const xEnd = xAtV(stackSoFar + v);
        x = Math.min(xStart, xEnd);
        w = Math.abs(xEnd - xStart);
        stackSoFar += v;
      } else {
        const slot = usableH / series.length;
        y = yCenter - usableH / 2 + si * slot;
        h = slot * 0.86;
        const baseX = xAtV(vLo < 0 && vHi > 0 ? 0 : vLo);
        const xV = xAtV(v);
        x = Math.min(xV, baseX);
        w = Math.abs(xV - baseX);
      }
      const title = `${esc(s.name)}${
        labels[i] ? ` · ${esc(labels[i])}` : ""
      }: ${esc(ctx.fmtV(v))}`;
      const dataAttrs =
        `data-tip="${title}" data-color="${color}" data-series="${
          esc(s.name)
        }" data-index="${i}" data-value="${v}" data-label="${
          esc(labels[i] ?? "")
        }"`;
      const barDelay = (i * 0.03).toFixed(3);
      layers.push(
        `<g class="series series-${si}">` +
          `<rect class="hit hbar" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}"${fo} ${dataAttrs} style="animation-delay: ${barDelay}s"><title>${title}</title></rect>` +
          (showValues
            ? `<text class="value-label" x="${x + w + 4}" y="${
              y + h / 2
            }" text-anchor="start" dominant-baseline="middle">${
              esc(ctx.fmtV(v))
            }</text>`
            : "") +
          `</g>`,
      );
    });
  });

  // Reference lines → vertical value thresholds.
  if (Array.isArray(ctx.refLines)) {
    for (const ref of ctx.refLines) {
      if (!ref || !Number.isFinite(ref.value)) continue;
      const x = xAtV(ref.value);
      const color = ref.color ||
        "var(--tc-chart-axis, var(--tc-color-ink-muted, #6b7280))";
      layers.push(
        `<line class="ref-line" x1="${x}" x2="${x}" y1="${padTop}" y2="${
          padTop + plotH
        }" stroke="${color}" stroke-dasharray="${esc(ref.dash ?? "5 4")}"/>`,
      );
      if (ref.label) {
        layers.push(
          `<text class="ref-label" x="${x + 4}" y="${
            padTop + 10
          }" text-anchor="start">${esc(ref.label)}</text>`,
        );
      }
    }
  }

  return chrome.join("") + layers.join("");
}

function renderDonut(ctx: ChartCtx, props: Record<string, unknown>): string {
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
    const color = s.color || colorFor(i, ctx.palette);
    const pct = ((value / total) * 100).toFixed(1).replace(/\.0$/, "");
    const title = `${esc(s.name)}: ${esc(ctx.fmtV(value))} (${pct}%)`;
    const segDelay = (i * 0.08).toFixed(3);
    out.push(
      `<path class="series-segment hit series-${i}" d="${path}" fill="${color}" data-tip="${title}" data-color="${color}" data-series="${
        esc(s.name)
      }" data-index="${i}" data-value="${value}" data-label="${
        esc(s.name)
      }" style="animation-delay: ${segDelay}s"><title>${title}</title></path>`,
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
  // Center label/value (only meaningful with a hole, i.e. innerRadius > 0).
  const centerValue = String(props.centerValue ?? "");
  const centerLabel = String(props.centerLabel ?? "");
  if (inner > 0 && (centerValue || centerLabel)) {
    if (centerValue) {
      out.push(
        `<text class="donut-center-value" x="${cx}" y="${
          cy - (centerLabel ? 6 : 0)
        }" text-anchor="middle" dominant-baseline="middle">${
          esc(centerValue)
        }</text>`,
      );
    }
    if (centerLabel) {
      out.push(
        `<text class="donut-center-label" x="${cx}" y="${
          cy + (centerValue ? 16 : 0)
        }" text-anchor="middle" dominant-baseline="middle">${
          esc(centerLabel)
        }</text>`,
      );
    }
  }
  return out.join("");
}

function renderLegend(
  series: Series[],
  palette: string[],
  hidden: string[],
): string {
  if (series.length === 0) return "";
  return `<div class="legend" part="legend">` +
    series.map((s, i) => {
      const color = colorFor(i, palette);
      const isHidden = hidden.includes(s.name);
      const cls = isHidden ? "legend-item is-hidden" : "legend-item";
      return `<button class="${cls}" type="button" data-series="${
        esc(s.name)
      }" aria-pressed="${isHidden ? "true" : "false"}" title="${
        isHidden ? "Show" : "Hide"
      } series '${
        esc(s.name)
      }'"><span class="swatch" style="background:${color}"></span>${
        esc(s.name)
      }</button>`;
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
    /* Donut + horizontal bars size to their own aspect (no stretch). */
    .root.intrinsic .canvas { height: auto; }
    .root.intrinsic svg { height: auto; }
    /* Legend placement. */
    .root.legend-top .legend { margin-top: 0; margin-bottom: 14px; }
    .root.legend-right {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .root.legend-right .legend {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      margin-top: 0;
    }
    .hit { cursor: var(--tc-chart-hit-cursor, default); }
    .series-segment.clickable, rect.hit.clickable, .hit.clickable { cursor: pointer; }
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
    .donut-center-value {
      font-size: 26px; font-weight: 700;
      fill: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .donut-center-label {
      font-size: 12px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .ref-line { stroke-width: 1.5; fill: none; }
    .ref-label {
      font-size: 10px; font-weight: 600;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .bar-cat-label {
      font-size: 11px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .series-line {
      stroke-width: var(--tc-sw, 2);
      stroke-opacity: var(--tc-so, 1);
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    /* Per-series dash: opt out of the draw-in animation (which hijacks
       stroke-dasharray) and use the requested pattern instead. */
    .series-line.custom-dash {
      animation: none !important;
      stroke-dasharray: var(--tc-dash, 0);
      stroke-dashoffset: 0;
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
      gap: 6px 4px;
      margin-top: 14px;
      font-family: var(--tc-chart-font);
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: -0.005em;
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 9px;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease, opacity 0.15s ease;
      line-height: 1.3;
    }
    .legend-item:hover {
      background: color-mix(in srgb, var(--tc-chart-fg, currentColor) 7%, transparent);
    }
    .legend-item:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 2px;
    }
    .legend-item.is-hidden {
      opacity: 0.45;
    }
    .legend-item.is-hidden .swatch {
      background: var(--tc-chart-grid, #ece5d3) !important;
    }
    .swatch {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex: 0 0 auto;
      transition: background 0.15s ease;
    }

    /* Draw-in animations applied on every render where a data layer
       lands. animation-fill-mode forwards keeps the final state; hit
       elements remain at opacity 1 / scale 1 once finished. */
    .series-line,
    .series-fill {
      animation: tc-chart-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
    }
    .series-fill {
      animation-name: tc-chart-fade-in;
      animation-duration: 0.7s;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
      opacity: 0;
    }
    .series-point {
      animation: tc-chart-pop 0.45s cubic-bezier(0.4, 0, 0.2, 1) backwards;
      opacity: 0;
    }
    rect.hit {
      transform-origin: center bottom;
      transform-box: fill-box;
      animation: tc-chart-bar-grow 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }
    /* Horizontal bars grow rightward from the value baseline. */
    rect.hit.hbar {
      transform-origin: left center;
      animation-name: tc-chart-hbar-grow;
    }
    @keyframes tc-chart-hbar-grow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    .series-segment.hit {
      animation: tc-chart-segment-in 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
      transform-origin: center;
      transform-box: view-box;
    }
    @keyframes tc-chart-draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes tc-chart-fade-in {
      to { opacity: 1; }
    }
    @keyframes tc-chart-pop {
      0%   { opacity: 0; transform: scale(0.4); transform-origin: center; transform-box: fill-box; }
      70%  { opacity: 1; transform: scale(1.15); transform-origin: center; transform-box: fill-box; }
      100% { opacity: 1; transform: scale(1); transform-origin: center; transform-box: fill-box; }
    }
    @keyframes tc-chart-bar-grow {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }
    @keyframes tc-chart-segment-in {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .series-point, .series-segment { transition: none; }
      .series-line, .series-fill, .series-point, rect.hit, rect.hit.hbar, .series-segment.hit {
        animation: none !important;
        stroke-dashoffset: 0 !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
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
      // Bar orientation: "vertical" (default) or "horizontal". Horizontal
      // bars give every category a permanent left-aligned label — the right
      // fit for ranking and for many categories.
      orientation: { type: "string", default: "vertical" },
      // x-axis label density. labelStride forces "every Nth"; maxLabels caps
      // the count (auto-strided to fit); labelAngle rotates ticks (e.g. -35).
      // Defaults reproduce the prior auto-thinning (~8 labels).
      labelStride: { type: "number", default: 0 },
      maxLabels: { type: "number", default: 0 },
      labelAngle: { type: "number", default: 0 },
      // Value / tick formatting: "compact" | "integer" | "percent" |
      // "currency" | "none", or any string treated as a unit suffix.
      valueFormat: { type: "string", default: "compact" },
      tickFormat: { type: "string", default: "" },
      // Threshold / marker lines: [{ axis:"y", value:6e6, label?, dash?, color? }].
      refLines: { type: "json", default: [] },
      // Legend placement: "bottom" (default) | "top" | "right".
      legendPosition: { type: "string", default: "bottom" },
      // Donut center text.
      centerLabel: { type: "string", default: "" },
      centerValue: { type: "string", default: "" },
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
    stylesheet: CHART_STYLE,
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
      const fullData = hasExplicit
        ? explicitData!
        : (fetchedData ?? { series: [] });
      // Legend-toggle: the legend renders every series so users can
      // turn them back on, but renderers see only the visible subset.
      const hidden = Array.isArray(state.hiddenSeries)
        ? (state.hiddenSeries as string[])
        : [];
      const data: ChartData = {
        labels: fullData.labels,
        series: (fullData.series ?? []).filter((s) => !hidden.includes(s.name)),
      };
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

      const valueFormat = String(props.valueFormat ?? "compact");
      const tickFormat = String(props.tickFormat ?? "") || valueFormat;
      const horizontalBar = type === "bar" &&
        String(props.orientation ?? "vertical").toLowerCase() === "horizontal";

      const W = isDonut ? 320 : 800;
      // Horizontal bars grow the viewBox height with the category count so
      // each row keeps a readable thickness (≈34px/row) instead of squeezing.
      const catCount = data.labels?.length ?? data.series[0]?.values?.length ??
        0;
      const H = isDonut
        ? 320
        : horizontalBar
        ? Math.max(220, 36 + catCount * 34)
        : 400;

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
        orientation: horizontalBar ? "horizontal" : "vertical",
        labelStride: Math.max(0, Number(props.labelStride ?? 0) || 0),
        maxLabels: Math.max(0, Number(props.maxLabels ?? 0) || 0),
        labelAngle: Number(props.labelAngle ?? 0) || 0,
        refLines: Array.isArray(props.refLines)
          ? (props.refLines as RefLine[])
          : [],
        fmtV: makeFormatter(valueFormat),
        fmtTick: makeFormatter(tickFormat),
      };

      const body = isDonut
        ? renderDonut(ctx, props)
        : horizontalBar
        ? renderHorizontalBars(ctx)
        : renderCartesian(ctx, type);

      const desc = ariaDescription(type, data);
      const height = esc(String(props.height ?? "240px"));
      // Donut and horizontal bars render to their intrinsic aspect (meet),
      // so neither the pie nor a ranked bar list gets stretched. Their
      // canvas height is auto (driven by the SVG aspect); other cartesian
      // charts keep the fixed `height` and fill it (preserveAspectRatio none).
      const intrinsic = isDonut || horizontalBar;
      const legendPos = ["top", "right", "bottom"].includes(
          String(props.legendPosition ?? "bottom"),
        )
        ? String(props.legendPosition)
        : "bottom";
      const rootCls = `root legend-${legendPos}${
        intrinsic ? " intrinsic" : ""
      }`;
      const legendHtml = props.showLegend && !isSparkline && fullData.series &&
          fullData.series.length > 0
        ? renderLegend(fullData.series, palette, hidden)
        : "";

      return html`
        <div class="${rootCls}" role="img" aria-label="${props.ariaLabel ??
          "Chart"}">
          ${legendPos === "top" ? unsafe(legendHtml) : ""}
          <div class="canvas" style="${intrinsic
            ? ""
            : `height:${unsafe(height)};`}">
            <svg
              viewBox="0 0 ${W} ${H}"
              preserveAspectRatio="${intrinsic ? "xMidYMid meet" : "none"}"
              aria-hidden="true"
            >
              ${unsafe(body)}
            </svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${unsafe(stateOverlay)}
          </div>
          ${legendPos !== "top" ? unsafe(legendHtml) : ""}
          <span
            class="visually-hidden"
            style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"
          >${desc}</span>
        </div>
      `;
    },
    events: {
      // Emit a public click event for points / bars / segments. Consumers
      // opt in by listening; detail carries the full data coordinate.
      "click .hit": (e, ctx) => {
        const target = (e.target as HTMLElement)?.closest(".hit") as
          | HTMLElement
          | null;
        if (!target || target.dataset.index == null) return;
        const detail = {
          series: target.dataset.series ?? "",
          index: Number(target.dataset.index),
          label: target.dataset.label ?? "",
          value: target.dataset.value != null
            ? Number(target.dataset.value)
            : null,
        };
        ctx.emit(
          target.classList.contains("series-segment")
            ? "tc-segment-click"
            : "tc-point-click",
          detail,
        );
      },
      "click .legend-item": (e, ctx) => {
        const target = (e.target as HTMLElement)?.closest(".legend-item") as
          | HTMLElement
          | null;
        if (!target) return;
        const name = target.dataset.series;
        if (!name) return;
        const cur = (ctx.getState("hiddenSeries") as string[] | undefined) ??
          [];
        const next = cur.includes(name)
          ? cur.filter((n) => n !== name)
          : [...cur, name];
        ctx.setState("hiddenSeries", next);
      },
      "keydown .legend-item": (e, ctx) => {
        const ev = e as KeyboardEvent;
        if (ev.key !== "Enter" && ev.key !== " ") return;
        ev.preventDefault();
        const target = (ev.target as HTMLElement).closest(".legend-item") as
          | HTMLElement
          | null;
        const name = target?.dataset.series;
        if (!name) return;
        const cur = (ctx.getState("hiddenSeries") as string[] | undefined) ??
          [];
        const next = cur.includes(name)
          ? cur.filter((n) => n !== name)
          : [...cur, name];
        ctx.setState("hiddenSeries", next);
      },
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
