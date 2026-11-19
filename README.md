# Threads Physio — Next.js

Next.js rebuild of threadsphysio.com with Google Apps Script + Google Sheets form backend and an admin panel.

## Run
```
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000  · admin: /admin
```

## Google Sheets backend
1. Create a Google Sheet → Extensions → Apps Script → paste `apps-script/Code.gs`.
2. Project Settings → Script properties → `SECRET` = same as `APPS_SCRIPT_SECRET`.
3. Deploy → Web app (Execute as: Me, Access: Anyone) → copy `/exec` URL to `APPS_SCRIPT_URL`.

Responses land in the `Responses` tab. The admin panel (`/admin`) searches, filters, updates status/notes, deletes, and exports CSV.
