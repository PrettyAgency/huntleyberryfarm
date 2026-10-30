# Huntley Berry Farm - Homepage Redesign Proposal

Static homepage proposal for huntleyberryfarm.com.au. No build step: open `index.html` or serve the folder.

## Structure

- `index.html` - homepage markup, meta tags, Open Graph and LocalBusiness JSON-LD
- `css/styles.css` - all styles, including responsive breakpoints (1100px, 900px, 600px) and reduced-motion rules
- `js/main.js` - sticky header state, mobile menu, scroll reveals, hero video fallback
- `assets/img/` - photography and logo from the existing site, with SEO-friendly filenames
- `assets/video/huntley-berry-farm-hero.mp4` - hero background video (1600px wide, muted, ~5 MB)

## Deploying on GitHub Pages

1. Push this folder to a repository.
2. Settings > Pages > Deploy from branch > select the branch and `/ (root)`.
3. The site is served from `index.html`.

## Notes for the build phase

- Navigation and buttons currently link to in-page anchors (`#shop`, `#visit`, `#about`, `#contact`). Point them at the real pages once those exist.
- No prices are shown; product cards link through to the shop.
- Fonts load from Google Fonts (Fraunces and Figtree). Self-host them if you prefer no third-party requests.
- The canonical URL and `og:image` assume the production domain; update if the proposal is hosted elsewhere.
