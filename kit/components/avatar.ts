/**
 * `<tc-avatar>` — user / entity avatar with image, initials fallback,
 * status dot, and optional ring.
 *
 * Props:
 *   src      string (default "")
 *   alt      string (default "")
 *   name     string (default "") — used for initials when src is missing or fails
 *   size     "xs" | "sm" | "md" | "lg" | "xl" (default "md")
 *   shape    "circle" | "square" (default "circle")
 *   status   "" | "online" | "away" | "busy" | "offline" (default "")
 *   ring     boolean (default false) — outline ring around the avatar
 *
 * Theme variables:
 *   --tc-avatar-bg, --tc-avatar-fg, --tc-avatar-ring,
 *   --tc-avatar-status-online, --tc-avatar-status-away,
 *   --tc-avatar-status-busy, --tc-avatar-status-offline,
 *   --tc-avatar-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-avatar";

export const tagName = TAG;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic background tint from the name so the same person gets
// the same color across pages.
const PALETTE: Array<[string, string]> = [
  ["#dde6f4", "#1f3a66"],
  ["#dbece2", "#155b40"],
  ["#efe2cf", "#8a572d"],
  ["#f4dad7", "#7a1a14"],
  ["#e3dcf1", "#3d2a73"],
  ["#d5e8e5", "#0d4f49"],
  ["#fbe3c5", "#7a4f0a"],
];
function tintFor(name: string): [string, string] {
  if (!name) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % PALETTE.length;
  return PALETTE[idx];
}

build(
  TAG,
  describe({
    props: {
      src: { type: "string", default: "" },
      alt: { type: "string", default: "" },
      name: { type: "string", default: "" },
      size: { type: "string", default: "md" },
      shape: { type: "string", default: "circle" },
      status: { type: "string", default: "" },
      ring: { type: "boolean", default: false },
    },
    theme: {
      "tc-avatar-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-avatar-fg": "var(--tc-color-ink, #14171f)",
      "tc-avatar-ring": "var(--tc-color-surface, #ffffff)",
      "tc-avatar-status-online": "#2f7a52",
      "tc-avatar-status-away": "#d7a52f",
      "tc-avatar-status-busy": "#b3261e",
      "tc-avatar-status-offline": "#9aa0a6",
      "tc-avatar-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "inline-block",
      position: "relative",
      "vertical-align": "middle",
    },
    template: ({ props }) => {
      const name = String(props.name ?? "");
      const src = String(props.src ?? "");
      const alt = String(props.alt ?? "") || name || "avatar";
      const size = String(props.size ?? "md");
      const shape = String(props.shape ?? "circle");
      const status = String(props.status ?? "");
      const ring = !!props.ring;
      const [bg, fg] = tintFor(name);

      return `
        <span class="root size-${esc(size)} shape-${esc(shape)} ${
        ring ? "ringed" : ""
      }"
              style="--tc-avatar-tint-bg: ${bg}; --tc-avatar-tint-fg: ${fg};">
          ${
        src
          ? `<img src="${esc(src)}" alt="${
            esc(alt)
          }" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${
            esc(initials(name))
          }'}))">`
          : `<span class="fallback" aria-label="${esc(alt)}">${
            esc(initials(name))
          }</span>`
      }
          ${
        status
          ? `<span class="status status-${esc(status)}" aria-label="${
            esc(status)
          }"></span>`
          : ""
      }
        </span>
        <style>
          :host { display: inline-block; vertical-align: middle; position: relative; }
          .root {
            position: relative;
            display: inline-grid;
            place-items: center;
            overflow: visible;
            font-family: var(--tc-avatar-font);
            font-weight: 600;
            color: var(--tc-avatar-tint-fg, var(--tc-avatar-fg));
            background: var(--tc-avatar-tint-bg, var(--tc-avatar-bg));
            user-select: none;
            line-height: 1;
          }
          .root img, .root .fallback {
            width: 100%; height: 100%;
            border-radius: inherit;
            object-fit: cover;
          }
          .root img { display: block; }
          .root .fallback {
            display: inline-grid;
            place-items: center;
            background: transparent;
            color: inherit;
          }
          .shape-circle { border-radius: 999px; }
          .shape-square { border-radius: var(--tc-radius-sm, 6px); }

          .size-xs { width: 20px; height: 20px; font-size: 0.62rem; }
          .size-sm { width: 28px; height: 28px; font-size: 0.74rem; }
          .size-md { width: 36px; height: 36px; font-size: 0.86rem; }
          .size-lg { width: 48px; height: 48px; font-size: 1rem; }
          .size-xl { width: 64px; height: 64px; font-size: 1.2rem; }

          .ringed {
            box-shadow: 0 0 0 2px var(--tc-avatar-ring);
          }

          .status {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 28%;
            height: 28%;
            min-width: 8px;
            min-height: 8px;
            border-radius: 999px;
            border: 2px solid var(--tc-avatar-ring);
            box-sizing: content-box;
          }
          .status-online { background: var(--tc-avatar-status-online); }
          .status-away { background: var(--tc-avatar-status-away); }
          .status-busy { background: var(--tc-avatar-status-busy); }
          .status-offline { background: var(--tc-avatar-status-offline); }
        </style>
      `;
    },
  }),
);
