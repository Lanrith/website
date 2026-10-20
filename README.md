# Lanrith website

The landing page for [lanrith.com](https://lanrith.com). Lanrith is an open-source router and edge OS for homelabs, currently in development.

This is a static site: HTML, CSS, small scripts for theme and illustrated interactions, and local brand assets. It has no build step or runtime dependencies.

## Preview

From this directory:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Editing

- `index.html` contains the page content and metadata.
- `styles.css` contains the layout and both themes.
- `theme.js` controls the theme preference.
- `motion.js` controls the illustrated interactions and optional motion.
- `assets/` contains the original Lanrith artwork, fonts, and font licences.

When changing a CSS or JavaScript file, update its `?v=` suffix in `index.html` to the first 12 characters of the file's SHA-256 hash. This refreshes cached assets for returning visitors.

Preserve the original brand artwork and page composition. Dark mode uses neutral charcoal surfaces with restrained teal accents; light mode uses the original warm paper palette. Keep fonts and images local.

Describe the project’s direction honestly while it is in development. Add installation, documentation, or release links only when their destinations are ready.

The [content and motion notes](docs/design-notes.md) explain the positioning, editorial choices, references, and limits on product claims.

Before publishing, check both themes on desktop and narrow mobile screens, keyboard navigation, the theme preference after reload, and the page with JavaScript disabled. Exercise each illustrated scene and the animation replay; check reduced motion on initial load and when changed at runtime. Check that local links and assets also work under the `/website/` path used by GitHub Pages.

## Hosting

GitHub Pages publishes the root of the `main` branch. `.nojekyll` makes this a plain static deployment.

The project URL is <https://lanrith.github.io/website/>. The intended custom domain is `lanrith.com`.

To connect the custom domain:

1. In this repository’s **Settings → Pages**, set the custom domain to `lanrith.com`.
2. Set the apex (`@`) DNS A records to:

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. Set `www` to a CNAME pointing to `lanrith.github.io`.
4. Wait for GitHub’s DNS check and certificate provisioning, then enable **Enforce HTTPS**.

GitHub creates a `CNAME` file when the custom domain is saved. Keep that file in subsequent deployments. See [GitHub’s custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for current instructions.

## Asset licensing

Font licences are included with the fonts. The Lanrith name, logo, and artwork are brand assets; this repository does not grant additional trademark rights.
