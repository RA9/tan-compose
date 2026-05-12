---
tag: tc-combobox
slug: combobox
category: form fields
summary: Searchable, optionally multi-select dropdown with tag chips and per-option icons. The "select N from many" widget that the native select multiple isn't.
description: tc-combobox documentation — single + multi-select, search, tag chips, icons, keyboard navigation, and form association.
importPath: "@ra9/tan-compose-kit/combobox"

props:
  - name: value
    type: string
    default: '""'
    description: Comma-separated values. A single value is just the value itself; multiple values are joined with commas. Also accepts a JSON array when set programmatically.
  - name: name
    type: string
    default: '""'
    description: Form field name. Used for FormData entries on submit.
  - name: options
    type: Array&lt;OptionDef&gt;
    default: "[]"
    description: Each entry is { value, label, icon?, disabled?, group? }. icon may be any short string — emoji flag, single glyph, etc.
  - name: multiple
    type: boolean
    default: "false"
    description: Enables chip-based multi-select. Selecting an option toggles it.
  - name: searchable
    type: boolean
    default: "true"
    description: When true (default) the user can type to filter options.
  - name: placeholder
    type: string
    default: '""'
    description: Empty-control hint.
  - name: empty-text
    type: string
    default: '"No results"'
    description: Text shown in the popup when no options match the filter.
  - name: label
    type: string
    default: '""'
    description: Form field label.
  - name: helper
    type: string
    default: '""'
    description: Helper text shown below the control.
  - name: error
    type: string
    default: '""'
    description: Error text. When set, the control turns red and the helper slot shows this text instead.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the control. Reflects to the host attribute.
  - name: required
    type: boolean
    default: "false"
    description: Marks the field as required. Reflects to the host attribute.
  - name: max
    type: number
    default: "0"
    description: Maximum number of selections in multiple mode. 0 means unlimited.

events:
  - name: tc-change
    detail: "{ value: string | string[] }"
    description: Fires when the selection changes. value is the array of selected values in multiple mode, the string otherwise.
  - name: tc-search
    detail: "{ query: string }"
    description: Fires on every keystroke in the search field. Useful for async option fetch.
  - name: tc-open
    description: Fires when the popup opens.
  - name: tc-close
    description: Fires when the popup closes.

slots: []

cssVars:
  - name: "--tc-input-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Background of the control.
  - name: "--tc-input-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Default border color.
  - name: "--tc-input-border-focus"
    default: "var(--tc-color-accent, #a16939)"
    description: Border color when the popup is open or the control is focused.
  - name: "--tc-input-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Border + helper color when error is set.
  - name: "--tc-combobox-chip-bg"
    default: "var(--tc-color-accent-soft, #efe2cf)"
    description: Background of selected-value chips in multiple mode.
  - name: "--tc-combobox-chip-fg"
    default: "var(--tc-color-accent-hover, #8a572d)"
    description: Text color of chips.
  - name: "--tc-combobox-popup-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Popup background.
  - name: "--tc-combobox-popup-hover"
    default: "var(--tc-color-accent-soft, #efe2cf)"
    description: Background of the focused / hovered option.
  - name: "--tc-combobox-popup-active"
    default: "var(--tc-color-accent-soft, #efe2cf)"
    description: Background of selected options in the popup.

related:
  - select
  - input
  - radio-group
---

### Single-select with icons

The simplest case. `options` is an array of `{ value, label, icon? }`. Icons can be any short string — emoji flags, glyphs, anything that fits in a 16-px box.

<div class="stage col">
  <tc-combobox
    id="cb-single"
    label="Country"
    name="country"
    placeholder="Pick a country…"
  ></tc-combobox>
</div>

```ts
const cb = document.querySelector("tc-combobox");
cb.options = [
  { value: "US", label: "United States",  icon: "🇺🇸" },
  { value: "GB", label: "United Kingdom", icon: "🇬🇧" },
  { value: "JP", label: "Japan",          icon: "🇯🇵" },
];
cb.addEventListener("tc-change", (e) => {
  console.log(e.detail.value); // "US"
});
```

<script type="module">
  // Wire the live demos on this page.
  const single = document.getElementById("cb-single");
  if (single) {
    single.options = [
      { value: "US", label: "United States",  icon: "🇺🇸" },
      { value: "GB", label: "United Kingdom", icon: "🇬🇧" },
      { value: "FR", label: "France",         icon: "🇫🇷" },
      { value: "JP", label: "Japan",          icon: "🇯🇵" },
      { value: "BR", label: "Brazil",         icon: "🇧🇷" },
      { value: "IN", label: "India",          icon: "🇮🇳" },
      { value: "LR", label: "Liberia",        icon: "🇱🇷" },
      { value: "ZA", label: "South Africa",   icon: "🇿🇦" },
    ];
  }
  const multi = document.getElementById("cb-multi");
  if (multi) {
    multi.options = [
      { value: "US", label: "United States",  icon: "🇺🇸" },
      { value: "GB", label: "United Kingdom", icon: "🇬🇧" },
      { value: "FR", label: "France",         icon: "🇫🇷" },
      { value: "JP", label: "Japan",          icon: "🇯🇵" },
      { value: "BR", label: "Brazil",         icon: "🇧🇷" },
      { value: "IN", label: "India",          icon: "🇮🇳" },
      { value: "LR", label: "Liberia",        icon: "🇱🇷" },
      { value: "ZA", label: "South Africa",   icon: "🇿🇦" },
      { value: "AU", label: "Australia",      icon: "🇦🇺" },
    ];
  }
  const tags = document.getElementById("cb-tags");
  if (tags) {
    tags.options = [
      { value: "design",   label: "Design" },
      { value: "frontend", label: "Frontend" },
      { value: "backend",  label: "Backend" },
      { value: "infra",    label: "Infrastructure" },
      { value: "ml",       label: "Machine learning" },
      { value: "data",     label: "Data engineering" },
      { value: "mobile",   label: "Mobile" },
      { value: "ops",      label: "Operations" },
    ];
  }
</script>

### Multi-select with tag chips

Pass `multiple` and selections accumulate as chips. The `×` on each chip removes it; **Backspace** in the empty search field also removes the last chip. Selecting an already-selected option toggles it off.

<div class="stage col">
  <tc-combobox
    id="cb-multi"
    label="Countries you've shipped to"
    name="countries"
    multiple
    placeholder="Type to filter…"
  ></tc-combobox>
</div>

```html
<tc-combobox label="Countries" name="countries" multiple></tc-combobox>
```

In multiple mode, the form submits one entry per selected value (when `name` is set). Reading `el.value` returns a comma-separated string; `e.detail.value` in `tc-change` is the full array.

### No icons — plain tag picker

`icon` is optional. Drop it entirely for tag pickers, role pickers, or any flat list.

<div class="stage col">
  <tc-combobox
    id="cb-tags"
    label="Interests"
    name="interests"
    multiple
    max="3"
    helper="Pick up to 3."
  ></tc-combobox>
</div>

```ts
tagCombo.options = [
  { value: "design",   label: "Design" },
  { value: "frontend", label: "Frontend" },
  { value: "backend",  label: "Backend" },
];
```

The `max` prop limits the selection count in multiple mode. Once reached, additional options ignore clicks.

### Async option fetch

Combobox doesn't ship a built-in async-fetch behavior, but the `tc-search` event makes the typical pattern small. Debounce the query, fetch, then assign the result.

```ts
let timer;
const cb = document.querySelector("tc-combobox");
cb.addEventListener("tc-search", (e) => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const res = await fetch(`/api/users?q=${encodeURIComponent(e.detail.query)}`);
    cb.options = await res.json();
  }, 200);
});
```

### Form submission

Combobox is form-associated. Multi-select sets the form value via a `FormData` carrying one entry per chosen option; single-select sets a single string.

```html
<form>
  <tc-combobox name="countries" multiple required></tc-combobox>
  <tc-button type="submit">Submit</tc-button>
</form>
```

```ts
form.addEventListener("submit", (e) => {
  const data = new FormData(e.target);
  console.log(data.getAll("countries")); // ["US", "FR", "JP"]
});
```

### Theming

Combobox reuses the `--tc-input-*` tokens for its outer chrome, so it sits next to `<tc-input>` and `<tc-select>` cleanly. The chip and popup colors live in their own `--tc-combobox-*` tokens so you can tone them without disturbing the rest of the form.

```css
tc-combobox {
  --tc-combobox-chip-bg: #e6f0ff;
  --tc-combobox-chip-fg: #1c3a7a;
}
```

### Accessibility

- The search input gets `role="combobox"` and `aria-expanded` reflecting the popup state.
- The popup is `role="listbox"` and (in multi mode) `aria-multiselectable="true"`.
- Each option gets `role="option"` and `aria-selected`.
- Keyboard: ↑/↓ navigates, Enter selects, Esc closes, Backspace on empty search removes the last chip.
- Disabled options carry `aria-disabled="true"` and don't receive focus or activate.
