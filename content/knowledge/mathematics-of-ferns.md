---
title: "The quiet mathematics of ferns"
date: 2025-07-30T15:00:00+00:00
topics: ["botany", "math"]
summary: "Fern fronds grow by repeating small growth rules at smaller and smaller scales — a natural L-system — which is why a fern looks the same …"
---
Look closely at a fern frond and you'll see that each leaflet is a smaller,
recurved copy of the whole frond. This self-similarity is what makes ferns the
classic textbook example of a recursive system in nature.

## Growth as a set of rewrite rules

A frond doesn't grow from a single plan. It grows by repeatedly applying the
same small instruction: *tendrils appear at intervals, and each tendril grows
as a new start.*

In computing, this is an **L-system** — a set of rules applied over and over,
each pass doubling the complexity. Start with a single line, apply the frond
rule, apply it again, twenty times, and you get a structure indistinguishable
from a real fern.

## Why this is "fractal" but without the hype

Real ferns aren't true fractals — the self-similarity runs out after a handful
of levels, twig by twig. But the *principle* — a small rule amplified by
repetition — explains why a fern that fits in a pot and a fern that covers a
hillside are built the same way.

## The other famous spiral

Then there's phyllotaxis: leaves, petals, seeds and floret spirals arranged at
angles related to continued fractions. Pine cones and sunflowers follow
spirals based on the golden ratio not out of aestheticism, but because it's
the most efficient packing that lets every new bud appear as far as possible
from the previous one. It's a spacing algorithm wearing a beautiful coat.

> You cannot find a single gene that "draws a fern". You can find the tiny
> per-cell rules whose repetition happens to draw one.

## Try it at home

Draw a straight line. Add a small curving stub at intervals along it. Now add
the same pattern to each stub. Stop when the page feels fern-like. Welcome to
recursion — you now share a mental process with a plant that has no brain.
