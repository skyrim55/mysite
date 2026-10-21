---
title: "Trailmark"
date: 2025-03-01T10:00:00+00:00
status: "live"
year: 2025
description: "A lightweight hiking-route planner that runs fully offline — GPX files in, elevation profiles and turn-by-turn notes out."
summary: "A lightweight hiking-route planner that runs fully offline — GPX files in, elevation profiles and turn-by-turn notes …"
lede: "A lightweight hiking-route planner that runs fully offline, built around GPX files and local elevation data."
role: "Design & build"
stack: ["Go", "SQLite", "AlpineJS", "Leaflet"]
cover: "/img/proj-trailmark.svg"
link: "https://example.org"
---
**Trailmark** started with a frustrating week of planning a hiking trip using
pages that reloaded on every pin drag. So I built a route planner that does
everything client-side.

- Drop a GPX file in, or draw a route on the map
- Elevation profile, distance, and ascent all update live
- Waypoint notes sync to a local map
- Works offline — it's just static files

The Go backend is a single binary that helps convert and cache elevation data
for a region, so nothing ever pings a third party while you walk.
