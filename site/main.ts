/**
 * Entry point for the tan-compose docs site.
 *
 * Pages load this single bundle (`<script type="module" src="./dist/site.js">`)
 * and get:
 *   - the kit's default light theme tokens
 *   - all 22 kit components registered
 *   - the site-specific shell components (<site-nav>, <site-footer>)
 *
 * Loading additional theme presets (dark / bootstrap / tailwind / etc.)
 * is up to the page — pages that want a theme switcher import them
 * separately or inject the CSS strings directly.
 */

// Theme tokens — base light palette. Auto-injects.
import "../kit/themes/tokens.ts";

// Kit components.
import "../kit/mod.ts";

// Icon set — registers <tc-icon>.
import "../icons/mod.ts";

// Site shell.
import "./components/site-nav.ts";
import "./components/site-footer.ts";
