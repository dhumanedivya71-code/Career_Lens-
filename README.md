# CareerLens — Frontend + Supabase Backend

CareerLens is a student-focused career exploration website. This version keeps the existing HTML/CSS/JavaScript frontend and adds a Supabase-ready backend for authentication, profiles, skill progress, and saved careers.

## Folder structure

```text
CareerLens/
├── index.html
├── auth.html
├── dashboard.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── config.js
│   ├── auth.js
│   └── dashboard.js
├── supabase_schema.sql
└── README.md
```

## Setup

1. Create a project at https://supabase.com/
2. Open **SQL Editor** and run `supabase_schema.sql`.
3. Open **Project Settings → API** and copy the Project URL and publishable/anon key.
4. Edit `js/config.js`:

```js
export const SUPABASE_URL = "YOUR_SUPABASE_URL";
export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

5. Commit the changes to GitHub.
6. Netlify will automatically redeploy the GitHub-connected site.

## Important security note

Use only the browser-safe publishable/anon key in `config.js`. Never put a Supabase `service_role` or secret key in frontend JavaScript. Row Level Security policies in the SQL file protect each user's data.

## Authentication

- `auth.html?mode=signup` → Sign Up
- `auth.html` → Login
- `dashboard.html` → Logged-in dashboard

If email confirmation is enabled in Supabase Auth, a new user may need to verify their email before logging in.
