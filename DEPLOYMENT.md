# writespace – Deployment Guide

This document describes how to deploy **writespace** (React 18 + Vite + Tailwind) to production, including Vercel setup, environment notes, and CI/CD considerations.

---

## 1. Production Build

To build the app for production:

```bash
npm install
npm run build
```

The optimized static files will be output to the `dist/` directory.

---

## 2. Environment Variables

- All environment variables must be prefixed with `VITE_` to be accessible in the client.
- Place variables in `.env.production` or `.env` (never commit secrets).
- Example:
  ```
  VITE_API_URL=https://api.example.com
  ```

---

## 3. Vercel Deployment

**writespace** is designed for static hosting and works perfectly with [Vercel](https://vercel.com/):

### Steps

1. **Push to GitHub**  
   Ensure your code is pushed to a GitHub repository.

2. **Import to Vercel**  
   - Go to [Vercel Dashboard](https://vercel.com/import).
   - Import your GitHub repo.
   - Set the framework as **Vite** (Vercel auto-detects).

3. **Configure Build Settings**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install` (default)

4. **Environment Variables**  
   - Add any `VITE_` variables in the Vercel dashboard under "Environment Variables".

5. **Custom Rewrites**  
   - The included `vercel.json` ensures SPA routing works:
     ```json
     {
       "rewrites": [
         { "source": "/(.*)", "destination": "/" }
       ]
     }
     ```

6. **Deploy**  
   - Click "Deploy".  
   - Your app will be live at `https://<your-project>.vercel.app`.

---

## 4. Static Hosting (Alternative)

You can also deploy the `dist/` folder to Netlify, GitHub Pages, or any static host.

- For Netlify, add a `_redirects` file with:
  ```
  /*    /index.html   200
  ```

---

## 5. CI/CD Notes

- Vercel automatically triggers builds on every push to `main` (or your default branch).
- To run tests before deploy, add a `test` script in your workflow:
  ```json
  "scripts": {
    "test": "vitest"
  }
  ```
- Vercel will fail the build if `npm test` fails.

---

## 6. Data Persistence

- All data (users, posts, session) is stored in **localStorage**.
- No backend is required; deployment is frontend-only.
- To reset data, clear your browser's localStorage for the site.

---

## 7. Troubleshooting

- **Blank page after deploy?**  
  Check that rewrites are set up for SPA routing (see above).
- **Environment variables not working?**  
  Make sure they are prefixed with `VITE_` and set in Vercel dashboard.
- **Build errors?**  
  Run `npm run build` locally to debug before deploying.

---

## 8. Useful Commands

- **Local dev:** `npm run dev`
- **Build:** `npm run build`
- **Preview prod build:** `npm run preview`
- **Test:** `npm test`

---

&copy; 2024 writespace. All rights reserved.