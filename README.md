# CareerCraft - AI Resume Builder

CareerCraft helps users build ATS-friendly resumes with live preview, templates, AI-assisted content improvement, and PDF export.

## Features

- Live resume preview while editing
- Multiple templates (Classic, Modern, Minimal)
- AI assistance:
  - Bullet point enhancement
  - Professional summary generation
  - ATS keyword check against a job description
- PDF export (A4)
- Local auto-save

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 3
- React Router 7
- Framer Motion
- Lucide React
- html2canvas + jsPDF
- Vercel Serverless Function for OpenAI in production

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- OpenAI API key

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update values.

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Notes:
- Local `npm run dev` uses `VITE_OPENAI_API_KEY` (via Vite proxy).
- Production on Vercel uses `OPENAI_API_KEY` in the serverless function.

### 3. Run local development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## GitHub Push (Safe Flow)

If `.env` was ever committed, remove it from tracking and rotate key(s).

```bash
git rm --cached .env
git add .
git commit -m "chore: secure env handling and vercel deployment setup"
git push origin main
```

If this is your first push from local:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Vercel Deployment (Live Site)

### 1. Import repository

1. Open Vercel Dashboard.
2. Click **Add New > Project**.
3. Import this GitHub repository.

### 2. Configure build settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3. Add environment variable

In Vercel Project Settings > Environment Variables:

- `OPENAI_API_KEY` = your OpenAI key

Do not set `VITE_OPENAI_API_KEY` in production unless you intentionally want to expose it to the browser.

### 4. Deploy

Click **Deploy**. Vercel will generate a production URL.

### 5. Custom domain (optional)

Project Settings > Domains > Add domain, then follow DNS instructions.

## Project Notes

- `api/openai.js` handles production OpenAI requests on the server side.
- `vercel.json` includes SPA routing fallback so React routes work on refresh.
- `.env` and `.env.*` are ignored; `.env.example` is kept for onboarding.
