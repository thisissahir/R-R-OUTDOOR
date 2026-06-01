# R&R Outdoor Essentials — Marketing Site

Static marketing website for **R&R Outdoor Essentials**, a Pine County landscape
design, lawn care, and outdoor living company. Built from the
`design_handoff_r_and_r_design_system` reference kit.

## Stack

Plain, build-free static site — HTML + CSS + vanilla JS. No framework, no
toolchain. Deploys to Vercel (or any static host) as-is.

- `index.html` — single long-scroll homepage (header, hero, services, projects, process, testimonial, footer, estimate modal).
- `styles.css` — design tokens ported from `system/colors_and_type.css` plus all component styles.
- `main.js` — header scroll inversion, project filter grid, estimate-modal flow, mobile nav.
- `assets/` — logos, mark (favicon), and photography from the handoff.
- `vercel.json` — clean URLs + asset caching.

## Local preview

It's static — just open `index.html`, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Design fidelity

Colors, type, spacing, radii, shadows, and motion are tokenized in `:root`
(see `styles.css`) and match the handoff exactly. Icons are inlined Lucide
outline glyphs (2px stroke) via an SVG sprite — no CDN dependency.

## TODO before launch

- Wire the estimate form (`main.js` → `form.submit`) to a real endpoint
  (Resend / Postmark / CRM webhook). It currently only shows the confirmation step.
- Replace Google Maps photography with a proper shoot (warm white balance,
  mid contrast, real properties — per the handoff brief).
- Fill in real social, phone, email, and hours.

## Voice rules (from handoff — do not rewrite copy without these)

Professional, direct, no fluff. No exclamation marks (except sparingly in CTAs).
No emoji. Sentence case for buttons/nav/headlines. Second person ("your yard").
Vocabulary: yard / lawn / garden / outdoor room / hardscape / season.
