---
title: "Tideline"
date: 2025-07-20T08:00:00+00:00
status: "live"
year: 2025
description: "A calm typographic forecast of tides and moon phases for UK coasts — charted data read as a daily rhythm."
summary: "A calm typographic forecast of tides and moon phases for UK coasts — charted data read as a daily rhythm."
lede: "A calm, typographic forecast of tides and moon phases for UK coasts — charted data as a daily rhythm, not a dashboard."
role: "Design & build"
stack: ["Svelte", "D3", "Rust"]
cover: "/img/proj-tideline.svg"
---
**Tideline** displays tide tables the way people actually use them: "the beach
is walkable between 14:40 and 19:10." No scrolling charts full of numbers.

It aggregates UK tide predictions with moon phase and a friendly plain-language
summary, wrapped in a Svelte front-end and a Rust API that caches predictions
for a month at a time.
