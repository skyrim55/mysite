---
title: "Herbarium OCR"
date: 2023-12-02T14:00:00+00:00
status: "wip"
year: 2023
description: "A pipeline that digitises a local natural history society’s hand-written plant records into a searchable database."
summary: "A pipeline that digitises a local natural history society’s hand-written plant records into a searchable database."
lede: "Digitising a local natural history society's hand-written plant records — transcribing species, dates and locations from scans."
role: "Research, backend"
stack: ["Python", "Tesseract", "ONNX"]
cover: "/img/proj-herbarium.svg"
---
A local natural history society has a century of hand-written plant records —
species, dates, locations — in ledgers nobody can easily search.

**Herbarium OCR** turns those scans into structured data:

- Layout analysis to find table rows in a scan
- Tesseract trained further on the society's handwriting examples
- Genus names validated against a taxonomic reference list
- Humans confirm only the low-confidence cells

So far it has correctly transcribed over 4,000 records from the first ledger
and found two species nobody realised had ever been recorded locally.
