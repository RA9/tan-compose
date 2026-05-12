---
tag: tc-carousel
slug: carousel
category: chrome
summary: Slide / fade carousel with autoplay, indicators, controls, keyboard nav, and pointer swipe. Slides go in the default slot.
description: tc-carousel documentation — basic, autoplay, fade, vertical, indicators-only, and image gallery examples plus full props and theming reference.
importPath: "@ra9/tan-compose-kit/carousel"

props:
  - name: value
    type: number
    default: "0"
    description: Current slide index. Reflects to the `value` attribute.
  - name: autoplay
    type: number
    default: "0"
    description: Autoplay interval in milliseconds. `0` disables autoplay.
  - name: loop
    type: boolean
    default: "true"
    description: Wrap around at the ends. Disable to stop at first / last slide.
  - name: orientation
    type: '"horizontal" | "vertical"'
    default: '"horizontal"'
    description: Slide axis. Vertical carousels require a `height`.
  - name: transition
    type: '"slide" | "fade"'
    default: '"slide"'
    description: How slides change. `slide` translates the track; `fade` cross-fades stacked slides.
  - name: indicators
    type: boolean
    default: "true"
    description: Render dot indicators along the bottom (or right, vertical).
  - name: controls
    type: boolean
    default: "true"
    description: Render the prev / next buttons.
  - name: swipe
    type: boolean
    default: "true"
    description: Enable pointer / touch drag to change slides.
  - name: pauseOnHover
    type: boolean
    default: "true"
    description: Pause autoplay while the carousel is hovered or focused.
  - name: ariaLabel
    type: string
    default: '"Carousel"'
    description: Accessible region label.
  - name: height
    type: string
    default: '""'
    description: Optional explicit viewport height (any CSS length). Required for vertical and fade carousels with images.

events:
  - name: tc-change
    detail: '{ index: number, previous: number }'
    description: Fires when the active slide changes (user click, swipe, keyboard, autoplay, or programmatic value change).

slots:
  - name: (default)
    description: One direct child per slide. The carousel observes children and updates as you add or remove slides.

cssVars:
  - name: "--tc-carousel-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Outer corner radius.
  - name: "--tc-carousel-bg"
    default: "var(--tc-color-bg, #faf8f3)"
    description: Background behind slides.
  - name: "--tc-carousel-control-bg"
    default: "rgba(255, 255, 255, 0.85)"
    description: Prev / next button background.
  - name: "--tc-carousel-control-bg-hover"
    default: "rgba(255, 255, 255, 1)"
    description: Prev / next button hover background.
  - name: "--tc-carousel-control-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Prev / next button icon color.
  - name: "--tc-carousel-control-size"
    default: "36px"
    description: Prev / next button diameter.
  - name: "--tc-carousel-indicator"
    default: "rgba(20, 23, 31, 0.25)"
    description: Indicator pill background.
  - name: "--tc-carousel-indicator-active"
    default: "var(--tc-color-accent, #a16939)"
    description: Active dot fill.
  - name: "--tc-carousel-duration"
    default: "320ms"
    description: Transition duration. Respected by both slide and fade modes.

related:
  - tabs
  - modal
  - card
---

### Basic

The default carousel is a horizontal slide track with controls, indicators, looping, and pointer swipe. Each child of `<tc-carousel>` becomes a slide.

<div class="stage">
  <tc-carousel ariaLabel="Basic example" style="max-width: 560px; --tc-carousel-height: 220px;">
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(135deg,#a16939,#d9b78a);color:#fff;font-weight:600;font-size:1.5rem;">Slide 1</div>
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(135deg,#3a5a40,#a3b18a);color:#fff;font-weight:600;font-size:1.5rem;">Slide 2</div>
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(135deg,#1f3a66,#7eaad9);color:#fff;font-weight:600;font-size:1.5rem;">Slide 3</div>
  </tc-carousel>
</div>

```html
<tc-carousel ariaLabel="Featured">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</tc-carousel>
```

### Autoplay

Set `autoplay` to a millisecond interval. The carousel pauses on hover and on keyboard focus by default — turn that off with `pauseOnHover="false"` if you want it to keep cycling.

<div class="stage">
  <tc-carousel autoplay="2500" ariaLabel="Autoplay example" style="max-width: 560px; --tc-carousel-height: 200px;">
    <div style="display:grid;place-items:center;height:200px;background:#ece5d3;color:#14171f;font-weight:600;">A</div>
    <div style="display:grid;place-items:center;height:200px;background:#dde6f4;color:#14171f;font-weight:600;">B</div>
    <div style="display:grid;place-items:center;height:200px;background:#dbece2;color:#14171f;font-weight:600;">C</div>
    <div style="display:grid;place-items:center;height:200px;background:#f5e7cf;color:#14171f;font-weight:600;">D</div>
  </tc-carousel>
</div>

```html
<tc-carousel autoplay="2500">
  <div>A</div><div>B</div><div>C</div><div>D</div>
</tc-carousel>
```

### Fade transition

`transition="fade"` cross-fades slides stacked on top of each other. Set `height` so the viewport keeps a fixed size while content swaps.

<div class="stage">
  <tc-carousel transition="fade" autoplay="3000" height="180px" ariaLabel="Fade example" style="max-width: 560px;">
    <div style="display:grid;place-items:center;padding:24px;background:#14171f;color:#fff;font-size:1.05rem;line-height:1.5;text-align:center;">
      "Tiny declarative library for building Web Components. No JSX, no compiler."
      <br><span style="font-size:0.8rem;opacity:0.7;margin-top:8px;display:inline-block;">— release notes</span>
    </div>
    <div style="display:grid;place-items:center;padding:24px;background:#a16939;color:#fff;font-size:1.05rem;line-height:1.5;text-align:center;">
      "Refs, reactive props, and a focus-preserving render loop in 60 lines."
      <br><span style="font-size:0.8rem;opacity:0.7;margin-top:8px;display:inline-block;">— v1.1.0</span>
    </div>
    <div style="display:grid;place-items:center;padding:24px;background:#3a5a40;color:#fff;font-size:1.05rem;line-height:1.5;text-align:center;">
      "Drop-in primitives. No global cascade, no framework runtime."
      <br><span style="font-size:0.8rem;opacity:0.7;margin-top:8px;display:inline-block;">— kit v1.5.0</span>
    </div>
  </tc-carousel>
</div>

```html
<tc-carousel transition="fade" autoplay="3000" height="180px">
  <blockquote>"Quote one."</blockquote>
  <blockquote>"Quote two."</blockquote>
  <blockquote>"Quote three."</blockquote>
</tc-carousel>
```

### Vertical

`orientation="vertical"` rotates the track and indicators. A `height` is required so the viewport has a defined extent to scroll within.

<div class="stage">
  <tc-carousel orientation="vertical" height="220px" ariaLabel="Vertical example" style="max-width: 360px;">
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(180deg,#a16939,#d9b78a);color:#fff;font-weight:600;font-size:1.25rem;">One</div>
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(180deg,#3a5a40,#a3b18a);color:#fff;font-weight:600;font-size:1.25rem;">Two</div>
    <div style="display:grid;place-items:center;height:220px;background:linear-gradient(180deg,#1f3a66,#7eaad9);color:#fff;font-weight:600;font-size:1.25rem;">Three</div>
  </tc-carousel>
</div>

```html
<tc-carousel orientation="vertical" height="220px">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</tc-carousel>
```

### Indicators only, no controls

Hide the prev / next buttons for a more editorial feel. Indicators stay clickable.

<div class="stage">
  <tc-carousel controls="false" autoplay="2800" ariaLabel="Editorial example" style="max-width: 560px; --tc-carousel-height: 200px;">
    <div style="display:grid;place-items:center;height:200px;background:#14171f;color:#fff;font-weight:600;font-size:1.4rem;letter-spacing:-0.01em;">Ship work, not config.</div>
    <div style="display:grid;place-items:center;height:200px;background:#a16939;color:#fff;font-weight:600;font-size:1.4rem;letter-spacing:-0.01em;">Drop into any page.</div>
    <div style="display:grid;place-items:center;height:200px;background:#3a5a40;color:#fff;font-weight:600;font-size:1.4rem;letter-spacing:-0.01em;">Native standards.</div>
  </tc-carousel>
</div>

```html
<tc-carousel controls="false" autoplay="2800">
  <h2>Ship work, not config.</h2>
  <h2>Drop into any page.</h2>
  <h2>Native standards.</h2>
</tc-carousel>
```

### Image gallery

Carousels are most often used for image galleries. Set `height` so all slides share the same viewport regardless of intrinsic image size.

<div class="stage">
  <tc-carousel autoplay="4000" height="260px" ariaLabel="Gallery" style="max-width: 560px;">
    <figure style="margin:0;height:260px;background:linear-gradient(135deg,#a16939 0%,#d9b78a 50%,#f1e3c8 100%);display:grid;place-items:end start;padding:16px;color:#fff;font-family:var(--tc-font-mono,monospace);font-size:0.78rem;">tan-01.jpg</figure>
    <figure style="margin:0;height:260px;background:radial-gradient(circle at 30% 30%, #fff 0%, #ece5d3 30%, #a16939 100%);display:grid;place-items:end start;padding:16px;color:#fff;font-family:var(--tc-font-mono,monospace);font-size:0.78rem;">tan-02.jpg</figure>
    <figure style="margin:0;height:260px;background:conic-gradient(from 220deg at 50% 50%, #1f3a66, #a16939, #1f3a66);display:grid;place-items:end start;padding:16px;color:#fff;font-family:var(--tc-font-mono,monospace);font-size:0.78rem;">tan-03.jpg</figure>
    <figure style="margin:0;height:260px;background:linear-gradient(45deg,#3a5a40 0%,#a3b18a 50%,#fff 100%);display:grid;place-items:end start;padding:16px;color:#14171f;font-family:var(--tc-font-mono,monospace);font-size:0.78rem;">tan-04.jpg</figure>
  </tc-carousel>
</div>

```html
<tc-carousel autoplay="4000" height="260px">
  <img src="/img/1.jpg" alt="…">
  <img src="/img/2.jpg" alt="…">
  <img src="/img/3.jpg" alt="…">
  <img src="/img/4.jpg" alt="…">
</tc-carousel>
```

### Listening for slide changes

```html
<tc-carousel id="hero" autoplay="3000">
  <div>One</div><div>Two</div><div>Three</div>
</tc-carousel>

<script>
  document.getElementById("hero").addEventListener("tc-change", (e) => {
    console.log("now on slide", e.detail.index, "from", e.detail.previous);
  });
</script>
```

### Programmatic control

Set `value` to jump to a specific slide. The carousel reflects the prop to the `value` attribute, so two-way binding works with framework integrations.

```js
const car = document.querySelector("tc-carousel");
car.value = 2;          // jump to the third slide
car.value = car.value + 1; // next
```

### Accessibility

- The root has `role="region"` and `aria-roledescription="carousel"`. Set `ariaLabel` to something meaningful for screen readers.
- Each slide gets `role="group"`, `aria-roledescription="slide"`, and `aria-label="N of M"` applied automatically.
- A polite live region announces the new position on each change.
- Keyboard support: `←` / `→` (or `↑` / `↓` vertical) navigate, `Home` and `End` jump to the ends. Indicators are real `<button>` elements, focusable in source order.
- `prefers-reduced-motion: reduce` collapses transitions to instant.

### Theming

```html
<tc-carousel
  style="
    --tc-carousel-radius: 20px;
    --tc-carousel-bg: #0b0c10;
    --tc-carousel-control-bg: rgba(255,255,255,0.12);
    --tc-carousel-control-bg-hover: rgba(255,255,255,0.2);
    --tc-carousel-control-fg: #fff;
    --tc-carousel-duration: 500ms;
  "
  autoplay="3000"
  height="240px"
>
  <!-- slides -->
</tc-carousel>
```
