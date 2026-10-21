# Skyrim — Field Studio

A Hugo site. This folder is now the **source project**, not the published output.

> Originally this folder contained only the *finished* site (`index.html`, `portfolio/`, `css/`, …).
> Running `hugo server` in it produced an empty site and a 404, because Hugo had no `content/`,
> `layouts/` or config to build from. The source has been reconstructed from the published
> pages, so the output is identical to what Netlify was serving.

## Requirements

- Hugo v0.146 or newer (built and tested with v0.168.0)
- No Node, Sass or other toolchain needed

## Run locally

```powershell
hugo server          # http://localhost:1313
hugo server -D       # include drafts
```

Build for deployment:

```powershell
hugo --gc --minify   # writes public/
```

## Deploy to Netlify

`netlify.toml` already sets:

- build command: `hugo --gc --minify`
- publish directory: `public`
- Hugo version: `0.168.0`

Change `baseURL` in `hugo.toml` if the site moves to a custom domain.

## Structure

```
hugo.toml              site config, menus, params
netlify.toml           build + cache headers
content/
  _index.md            home page (title only; the hero lives in layouts/index.html)
  portfolio/           6 photographs
  projects/            5 projects
  knowledge/           6 field notes
layouts/
  _default/baseof.html page shell (head, header, footer, scripts)
  index.html           home page (hero, board SVG, parts bin, latest cards)
  404.html             not-found page
  portfolio/list.html  grid + category filters
  portfolio/single.html
  projects/list.html   card grid
  projects/single.html cover, prose, side panel
  knowledge/list.html  grid + topic filters
  knowledge/single.html
  partials/
    head.html header.html footer.html
    card-photo.html card-project.html card-note.html
assets/
  css/main.min.css     compiled stylesheet (see note below)
  js/main.min.js       compiled site JS
static/
  img/*.svg            project and portfolio artwork
  robots.txt
```

## Adding content

Add a Markdown file to the relevant folder; Hugo picks it up immediately. List order is
newest first (by `date`), so no manual sorting is needed.

### Photograph — `content/portfolio/my-photo.md`

```yaml
---
title: "My Photo"
date: 2026-01-15T09:00:00+00:00
phototype: "landscape"        # portrait | landscape | architecture | urban (drives filters)
place: "Somewhere, UK"
year: 2026
image: "/img/frame-fog.svg"   # file in static/img
caption: "Shown under the photo."
camera: "Fujifilm X-T4"
lens: "35mm f/1.4"
---
Body Markdown here.
```

### Project — `content/projects/my-project.md`

```yaml
---
title: "My Project"
date: 2026-02-01T10:00:00+00:00
status: "live"                # live | wip (badge + eyebrow)
year: 2026
description: "Used for the meta description and RSS."
summary: "Shown on cards."
lede: "Shown under the title on the project page."
role: "Design & build"
stack: ["Go", "SQLite"]
cover: "/img/proj-tideline.svg"
link: "https://example.org"   # optional "Visit project" button
---
Body Markdown here.
```

### Field note — `content/knowledge/my-note.md`

```yaml
---
title: "My Note"
date: 2026-03-01T09:00:00+00:00
topics: ["botany", "chemistry"]   # first topic = card label; all topics feed the filters
summary: "Shown on cards."
---
Body Markdown here. Use `## Heading` for sections; IDs are generated automatically.
```

## Notes

- **CSS/JS are the compiled files from the original build.** Only `main.min.css` and
  `main.min.js` exist — there was no Sass/TypeScript source in the published output. They are
  served through Hugo's asset pipeline (`fingerprint`), so filenames stay cache-busted and match
  the original build exactly. If you want to edit styles comfortably, un-minify a copy first.
- **No taxonomies.** `disableKinds = ["taxonomy", "term"]` keeps `/tags/` and `/categories/`
  from appearing; topics are a plain front-matter list.
- **Smart punctuation** (`typographer = true`) turns straight quotes into curly ones in Markdown
  bodies, matching the original output.
- Assets and pages are fingerprinted/inlined exactly as before, so the generated HTML matches
  the old published pages; the only addition is Hugo's `<meta name="generator">` tag.
