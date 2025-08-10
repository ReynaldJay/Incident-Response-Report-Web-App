# Incident-Response-Report-Web-App
A dark-mode, browser-based tool for creating incident response reports. Features a centered layout, live PDF preview that updates as you type, and clean exports containing only report content. Runs entirely in your browser for speed, privacy, and security.  

---

## Why this exists
This project demonstrates how a focused, user-friendly web tool can streamline structured incident reporting while keeping data local and secure. It highlights product thinking, front-end craftsmanship, and an understanding of IR workflows and documentation needs.

---

## Key features
- **Dark, centered UI** (50% width) for focus and readability  
- **Structured panels** covering metadata, summary, timeline, IOCs, impact, root cause, containment, recommendations, attachments, and approval  
- **Live PDF preview** that updates as you type (preview displays only the report content)  
- **Export options**: PDF, JSON, CSV, TXT — all export only the report, not the app UI  
- **Import JSON** to recreate previously saved reports in the editor  
- **Local-only processing**: auto-save drafts to `localStorage`; no server or external storage  
- **Inline guidance & hover tooltips** for each panel to aid accurate reporting

---

## Tech stack
- **HTML5, CSS3, JavaScript** (no frameworks)  
- **jsPDF** + **html2canvas** for PDF generation  
- Single-file frontend with separate `styles.css` and `app.js` for clarity

---

## How it supports stakeholders (HR / non-technical reviewers)
- Shows practical ability to design and deliver a polished front-end tool  
- Demonstrates attention to UX, accessibility, and privacy concerns relevant to security teams  
- Illustrates capability to translate operational workflows (incident response) into dependable software

---

## Getting started (run locally)
1. Clone or download the repo.  
2. Ensure the three files are in the same folder:
   - `index.html`
   - `styles.css`
   - `app.js`  
3. Open `index.html` in a modern browser (Chrome/Edge/Firefox). No server required.

---

## Usage notes
- Use **Import Report** (JSON) to load and edit an existing report.  
- The app auto-saves drafts every 10 seconds to browser `localStorage`. Use **Load Last Draft** to restore.  
- The **Live PDF Preview** shows only report content; exports produce a print-ready PDF.  
- All processing is local — attachments and drafts never leave the browser unless you export them.
---

