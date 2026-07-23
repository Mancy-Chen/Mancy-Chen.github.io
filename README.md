# Mingshi Chen — Personal Website

A responsive, accessible bilingual academic portfolio built with plain HTML, CSS, and JavaScript. No framework or paid template is required.

## Preview locally

Open `index.html` for English or `zh.html` for Chinese. The language button in the upper-right preserves the current section when switching pages.

For the most accurate preview, run a small local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing

The email, LinkedIn, Google Scholar, ORCID, publication DOI links, and PDF CV are already connected.

Review the biography, project status, skills, location, opportunity statement, and publication status before publishing. Update `Mingshi_Chen_CV.pdf` whenever your CV changes.

## Publish free with GitHub Pages

1. Create a new public GitHub repository, for example `personal-website`.
2. Upload `index.html`, `zh.html`, `styles.css`, `script.js`, and your CV.
3. Open **Repository Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will give you a temporary address such as:
   `https://yourusername.github.io/personal-website/`

For the cleanest default GitHub address, name the repository:

```text
yourusername.github.io
```

## Connect a domain

After buying a domain:

1. In the repository, open **Settings → Pages**.
2. Enter the domain under **Custom domain**, for example `mancychen.com`.
3. At your domain registrar, add the DNS records GitHub shows.
4. Wait for DNS verification.
5. Enable **Enforce HTTPS** when it becomes available.

A common setup is:

- root/apex domain: GitHub Pages `A` records
- `www`: a `CNAME` pointing to `yourusername.github.io`

Always copy the current DNS values from GitHub's official instructions rather than relying on old screenshots.

## Alternative: Vercel

Drag this folder into a GitHub repository, import the repository into Vercel, and deploy. Then open **Project Settings → Domains**, add your domain, and follow the displayed DNS instructions.

## File structure

```text
mingshi-chen-personal-website/
├── index.html       # English
├── zh.html          # Simplified Chinese
├── styles.css
├── script.js
├── Mingshi_Chen_CV.pdf   # included
└── README.md
```

## Design notes

- English / Simplified Chinese switch in the upper-right
- Light and dark themes
- Mobile navigation
- No external images
- Subtle brain/network illustration drawn as inline SVG
- Search-engine and social-sharing metadata
- Reduced-motion support
- Keyboard-friendly navigation

## Smartphone support

The site includes responsive layouts for common phone widths, including 360 px, 390 px, and 430 px screens. On phones:

- navigation opens as a full-screen touch-friendly menu;
- the hero, research cards, publications, toolkit, and contact buttons become single-column;
- decorative hero labels are hidden to prevent overlap;
- the About portrait scales down and stays centred;
- iPhone safe-area insets are respected;
- English and Chinese pages use the same responsive behaviour.
