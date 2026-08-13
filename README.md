# MFS Services — Single Page Website

This repository contains a modern, responsive, accessible single-page business website for **MFS Services** (Nigeria). It includes vehicle documentation, fleet management, registration, inspections and compliance services.

Files included:
- `index.html` — main single-page HTML
- `styles.css` — site styles
- `script.js` — interactive behavior (nav, carousel, contact form)
- `README.md` — this file

## Features
- Clean, professional Nigerian corporate design
- Mobile-first and responsive layout
- Smooth scrolling and subtle animations
- Accessible semantic HTML (skip link, ARIA attributes, keyboard-friendly)
- SEO best practices: meta description, Open Graph, Twitter card, canonical
- Structured data (JSON-LD) for local SEO
- Client-side contact form fallback (mailto) — no backend required
- Review link pointing to external Google review page
- No external paid libraries; plain HTML/CSS/JS suitable for GitHub Pages

## Deployment (GitHub Pages)
1. Create a new repository (e.g. `mfsservices-website`) or use an existing one.
2. Add files from this project to the repository root.
3. Push to GitHub.
4. In repository Settings -> Pages (or use the `gh-pages` branch), set the publishing source to the default branch and root folder.
5. The site will be available at `https://<username>.github.io/<repo>/` (or the custom domain if configured).

## Customization & Notes
- Replace the placeholder phone number and Google Maps placeholder with the actual business phone and an embedded Google Maps iframe (if required).
- Replace `assets/og-image.png` referenced in meta tags with a real Open Graph image in an `assets/` folder (optional).
- Contact form currently uses a `mailto:` fallback because there is no backend. For a production-ready contact form, add a server endpoint or an email provider integration.
- Adjust structured data in `index.html` to include accurate addresses, social profiles (`sameAs`) and operating hours.

## Accessibility
- Skip-to-content link and semantic landmarks
- Focus management and keyboard operability for main interactive elements
- ARIA attributes for dialog and carousel
- Respect for `prefers-reduced-motion`

## License
You may use and adapt this code for your business. No external paid libraries are required.

---

If you want, I can:
- Add a GitHub Pages ready repo (create branch and files),
- Replace the map placeholder with an embeddable Google Maps iframe (if you provide the exact address or coordinates),
- Add contact form backend using a serverless form endpoint or instructions for Netlify Forms / Formspree.
Tell me which option you prefer and I'll proceed.
