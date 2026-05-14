---
title: Liberia, by the numbers
slug: liberia-by-the-numbers
date: 2026-05-14
tag: case study · charts
version: v1.1.0
description: Liberia's population grew five-fold in sixty years; its access to electricity, water, and basic services did not. A data-led look at the gap, built end-to-end with tc-chart and the rest of the kit.
excerpt: Liberia's population grew five-fold between 1960 and 2023 — from about a million to 5.4 million. Its access to electricity, basic sanitation, and primary care did not scale with it. Six charts, one stat board, all themed against the same CSS tokens, fetched from a JSON endpoint by tc-chart so the page can re-skin without a rebuild.
---

Liberia, founded as a republic in 1847, is one of Africa's oldest. It also has, by every World Bank dashboard worth looking at, one of the longest-running and most persistent shortfalls in basic-service delivery on the continent. Roughly **51 % of Liberians live below the $2.15 / day extreme-poverty line**. Roughly **70 % do not have access to basic sanitation**. The under-five mortality rate is **71 per 1,000 live births** — nearly double the Sub-Saharan African average.

The story is also a useful test of `<tc-chart>`, the kit's chart component. Every chart on this page is **fetched at runtime from a JSON file** sitting next to the post (`/data/liberia/*.json`), themed with the same CSS tokens the rest of the kit uses, and re-skinable without re-instantiating anything. There's no Chart.js, no Recharts, no canvas. Hover any point and you'll see the underlying figure with its date and series.

<div class="stage" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
  <tc-stat label="Population (2023)" value="5.4" suffix="M"></tc-stat>
  <tc-stat label="Since 1960" value="+414" suffix="%"></tc-stat>
  <tc-stat label="Extreme poverty rate" value="51" suffix="%"></tc-stat>
  <tc-stat label="Electricity access" value="30" suffix="%"></tc-stat>
</div>

## The population, doubled and doubled again

The country has gone from **1.06 million** people in 1960 to **5.42 million** in 2023. The growth is steady almost everywhere except a single trough — Liberia *lost* people between 1990 and 1995. That's not a measurement artifact; it's the First Liberian Civil War (1989-1996), which forced an estimated 700,000 out of the country and killed around 150,000.

<div class="stage">
  <tc-chart
    type="line"
    height="280px"
    ariaLabel="Liberia total population, 1960 to 2023"
    style="width:100%;"
    src="../data/liberia/population.json"
    loadingText="Fetching population data…"
  ></tc-chart>
</div>

```html
<!-- The chart fetches its own data from the URL — no JS glue needed. -->
<tc-chart
  type="line"
  ariaLabel="Liberia total population, 1960 to 2023"
  src="/data/liberia/population.json"
  loadingText="Fetching population data…"
></tc-chart>
```

The JSON payload at `population.json` is the same shape `tc-chart` accepts inline — `{ labels: […], series: [{ name, values }] }`. The component handles the loading overlay, the error fallback if the fetch 404s, and the cleanup if you swap the `src` mid-flight.

<tc-callout variant="note" title="Where the numbers come from">
All figures here are pulled from World Bank Open Data, UN Inter-agency Group for Child Mortality Estimation, and the WHO/UNICEF Joint Monitoring Programme. The raw JSON includes a `_meta.source` field on every file with the exact indicator code. None of the data is interpolated — every point is a published estimate.
</tc-callout>

## Income that didn't follow the population

Per-capita GDP is the clearest reading of "is the typical Liberian better off?" — and it's the bluntest reminder of how rough the last forty years have been. The country was at **$482 per person** in 1980. By the time the Second Civil War ended in 2003, it had collapsed to **$175**. The post-2010 recovery brought it back to the **$700 range**, but Liberians are *still* poorer in nominal terms than they were before either war started — and dramatically below the Sub-Saharan African average across the same window.

<div class="stage">
  <tc-chart
    type="bar"
    height="260px"
    ariaLabel="Liberia GDP per capita compared to the Sub-Saharan Africa average, 1980 to 2023"
    style="width:100%;"
    src="../data/liberia/gdp-per-capita.json"
  ></tc-chart>
</div>

```html
<tc-chart
  type="bar"
  src="/data/liberia/gdp-per-capita.json"
></tc-chart>
```

The gap between the two bars in 2023 is just over **2.2x** — and that's after a decade of growth. In 1980, before the civil wars and Ebola, the gap was 1.5x.

## Light, water, drains

If you stop at "GDP recovered" you miss the story. Aggregate growth doesn't pay for transmission lines. It doesn't connect a borehole to a household. The single chart that captures Liberia's developmental situation best is the one that shows how many households actually have the things modernity is supposed to deliver.

<div class="stage">
  <tc-chart
    type="bar"
    height="280px"
    ariaLabel="Liberia access to basic services compared to Sub-Saharan Africa, 2022"
    style="width:100%;"
    src="../data/liberia/basics.json"
  ></tc-chart>
</div>

```html
<tc-chart
  type="bar"
  src="/data/liberia/basics.json"
></tc-chart>
```

The five bars track different basics. Liberia leads the regional average on exactly one (improved water access, narrowly). It trails on the other four — electricity, sanitation, mobile, internet. The widest gap is **basic sanitation**: 18 % vs 33 %. Among 195 countries the World Bank reports on, only Niger and Chad are lower.

The trajectory on electricity specifically is worth looking at, because it's the area where the most recent investment has happened:

<div class="stage">
  <tc-chart
    type="area"
    height="260px"
    ariaLabel="Liberia electricity access compared to Sub-Saharan Africa, 1990 to 2023"
    style="width:100%;"
    src="../data/liberia/electricity.json"
  ></tc-chart>
</div>

```html
<tc-chart
  type="area"
  src="/data/liberia/electricity.json"
></tc-chart>
```

The jump from 12 % in 2015 to 28 % by 2020 corresponds to the Mount Coffee hydropower plant coming back online (Ebola had shut down its 2014 commissioning) plus a chain of US- and EU-funded distribution buildouts in greater Monrovia. **The national figure still hides a 20:1 urban/rural gap.** A 2023 USAID household survey found that 85 % of Monrovians had grid access; in counties like Gbarpolu and River Gee the number was under 5 %.

## What it adds up to, for a child

The point of GDP and the point of grid hookups is that they keep small children alive. They reduce the chance that a household has to choose between a clinic visit and the day's food. The number to watch here is under-five mortality — child deaths in the first five years of life, per 1,000 live births.

<div class="stage">
  <tc-chart
    type="line"
    height="280px"
    ariaLabel="Liberia under-five mortality, 1990 to 2023, compared to Sub-Saharan Africa"
    style="width:100%;"
    src="../data/liberia/health.json"
  ></tc-chart>
</div>

```html
<tc-chart
  type="line"
  src="/data/liberia/health.json"
></tc-chart>
```

This is the chart where Liberia actually *has* a recovery story. The 1990 number — **263 deaths per 1,000 live births** — meant one in four Liberian children did not see their fifth birthday. By 2023 the rate was **71**. That's a 73 % reduction in three decades. The decline tracks the post-war stabilisation period, the international response to Ebola, and the expansion of community-health worker programmes.

It's also still **nearly double the Sub-Saharan African average of 38**, which was itself among the world's highest. The progress is real and the level is still bad.

## The income breakdown, in one ring

Aggregate GDP per capita is an average. The shape of Liberia's distribution is sharper: most households live on extreme- or near-extreme-poverty incomes, with a thin tail of upper-middle and high earners.

<div class="stage">
  <tc-chart
    type="donut"
    height="280px"
    showValues
    ariaLabel="Liberian population by income tier, 2022"
    style="width:100%; max-width: 380px;"
    src="../data/liberia/income-mix.json"
  ></tc-chart>
</div>

```html
<tc-chart
  type="donut"
  showValues
  src="/data/liberia/income-mix.json"
></tc-chart>
```

About **83 % of Liberians live on less than $3.65 a day**. That's the entire framing for any other indicator on this page — and the reason aggregate growth hasn't translated into better outcomes faster. A $760 per-capita GDP, in a country where the distribution is this bottom-heavy, means most households are far below even that.

## What tc-chart did and didn't do

What the chart component handled, end-to-end:

- **Fetched five JSON files** at page load via the new `src` prop. No `<script>` glue in this post; each chart pulls its own dataset.
- **Themed every series** through the same `--tc-chart-color-1` … `8` tokens the rest of the kit uses. Swap the theme preset and every chart on this page re-skins together.
- **Hover-tipped every point and bar**, so you can read the underlying figure without leaving the page.
- **Rendered ARIA descriptions** for each chart based on its data, so a screen reader hears "Line chart with 2 series (Liberia, Sub-Saharan Africa avg) and 8 data points" rather than "chart".
- **Stayed at ~12 KB** in the bundle for all six charts. The Chart.js equivalent would be 200+ KB before any of the data lands.

The component didn't do crosshair overlays, multi-axis lines, or animated transitions on data swap. Those will come; this version was good enough to tell the story.

## The full set

Every JSON file the post uses is in the repo at `/data/liberia/`. Each one carries a `_meta` object with the data's source and an editorial note about caveats — the same convention you'd want in a real internal dashboard so future-you remembers which World Bank revision the numbers came from.

```html
<tc-chart
  type="line"
  ariaLabel="…"
  src="/data/liberia/population.json"
  srcKey=""                <!-- optional: dot-path into the response -->
  loadingText="Loading…"
  errorText="Couldn't load chart data"
></tc-chart>
```

`src` and `data` are both supported on the same component. If you pass `data` explicitly it wins; if you pass `src`, the chart fetches once on mount, caches the result, and re-fetches only when `src` changes. The fetch is aborted on unmount, so navigating away mid-flight doesn't leak a pending request.

If you build a country dashboard like this one for your team, you'll find — like Liberia's developmental record finds — that the numbers themselves are the easy part. Showing them honestly, in the right context, with the right caveats, and getting the rendering off your team's critical path is the part that matters.
