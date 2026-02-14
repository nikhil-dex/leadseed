# Leadseed

Scalable SaaS for **user-triggered** lead extraction from LinkedIn: Next.js dashboard, Express API, MongoDB, Chrome extension (Manifest V3), JWT + LinkedIn OAuth, and a task engine ready for future automation.

## Project structure

```
/leadseed
  /dashboard   # Next.js 14+ App Router, Tailwind, modular UI
  /server      # Express, MongoDB, JWT, LinkedIn OAuth
  /extension   # Chrome MV3 (background, content, popup)
```

## Architecture

- **Backend**: Express API with JWT auth and LinkedIn OAuth. Tasks are created by the user (dashboard or extension); the extension polls for pending tasks and executes them (e.g. `extract_profile`).
- **Dashboard**: Login with LinkedIn, protected routes, sidebar (Dashboard, Leads, Tasks, Profile, Logout). "Extract Current Profile" creates a task; extension completes it when the user has a LinkedIn profile tab open.
- **Extension**: Stores JWT in `chrome.storage`, polls API every 10s for pending tasks, runs a **switch-based task executor** (easy to add new task types). On LinkedIn profile pages, injects a "Save Lead" button that creates an `extract_profile` task.
- **Compliance**: All automation is user-triggered (click "Save Lead" or "Extract Current Profile"); no background scraping.

### Compatibility (dashboard ↔ server ↔ extension)

- **Auth**: Dashboard stores JWT in `localStorage` under `leadseed_token`. User copies it from Profile and pastes into the extension popup; the extension stores it in `chrome.storage.local` as `token`. Same JWT is used for all API calls.
- **API base**: Dashboard uses `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`). Extension uses `API_BASE = 'http://localhost:4000'` in `background.js` and `content.js`; for production, change these to your API origin and ensure `host_permissions` in `manifest.json` includes it.
- **CORS**: Server allows requests from the dashboard origin (`DASHBOARD_URL`) and from any `chrome-extension://` origin so the extension can call the API.
- **Endpoints**: Extension calls `GET /tasks`, `POST /tasks`, `POST /tasks/:id/complete`; dashboard calls these plus `/leads`, `/leads/stats`, `/leads/:id` (PATCH), and `/auth/linkedin` for sign-in.

---

## Environment setup

### Server (`/server`)

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

- `PORT` – API port (default `4000`)
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – Strong secret in production
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` – From [LinkedIn Developer App](https://www.linkedin.com/developers/apps)
- `LINKEDIN_CALLBACK_URL` – `http://localhost:4000/auth/linkedin/callback` (dev)
- `DASHBOARD_URL` – `http://localhost:3000` (dev)

### Dashboard (`/dashboard`)

```bash
cp dashboard/.env.example dashboard/.env.local
```

Set:

- `NEXT_PUBLIC_API_URL=http://localhost:4000`

---

## Installation

1. **Node 18+** and **MongoDB** (local or Atlas).

2. **LinkedIn app**  
   Create an app at https://www.linkedin.com/developers/apps, add OAuth 2.0 redirect URL `http://localhost:4000/auth/linkedin/callback`, and request `openid`, `profile`, `email`.

3. **Monorepo install**

   ```bash
   cd leadseed
   npm install
   ```

4. **Extension**  
   No build step. Load the `extension` folder in Chrome: `chrome://extensions` → "Load unpacked" → select `leadseed/extension`. Optional: add `icons/icon16.png` and `icons/icon48.png` and reference them in `manifest.json` if desired.

---

## Run locally

1. **MongoDB**  
   Start MongoDB (e.g. `mongod` or use Atlas and set `MONGODB_URI`).

2. **API**

   ```bash
   npm run dev:server
   ```

   Server: http://localhost:4000

3. **Dashboard**

   ```bash
   npm run dev:dashboard
   ```

   Dashboard: http://localhost:3000

4. **Chrome extension**  
   Load unpacked from `leadseed/extension` (see above).

5. **Flow**  
   - Open http://localhost:3000 → Sign in with LinkedIn.  
   - Profile → "Copy token for extension" → Extension popup → paste token → Save.  
   - Open a LinkedIn profile (e.g. `https://www.linkedin.com/in/username`) → click "Save Lead", or from dashboard click "Extract Current Profile" (with that profile tab active).  
   - Extension polls every 10s, picks up the task, extracts name/headline/URL, completes the task; backend saves the lead. View leads on the Leads page.

---

## How to extend

### New task type (e.g. `extract_company`)

1. **Backend**  
   No change required; tasks are generic (`type`, `payload`, `result`). Optional: add a new route or keep using `POST /tasks` with `type: 'extract_company'`.

2. **Task execution**  
   In `extension/background.js`, add a case in `executeTask()`:

   ```js
   case 'extract_company': {
     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
     const results = await chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_COMPANY' });
     if (results?.result) await completeTask(task._id, token, results.result);
     break;
   }
   ```

3. **Content script**  
   In `extension/content.js`, handle the new action in `onMessage` and implement the DOM extraction; optionally add a new button or reuse "Save Lead" with a different payload.

4. **Dashboard**  
   Add a button or menu that calls `tasksApi.create('extract_company', { ... })` and optionally a new "Companies" list that reads from a new API (e.g. `GET /companies` and a corresponding backend model).

### New API route

- Add controller in `server/src/controllers/`, service in `server/src/services/`, route in `server/src/routes/`, and mount in `server/src/index.js`. Use `jwtAuth` for protected routes.

### New dashboard page

- Add a link in `dashboard/src/components/Sidebar.tsx` and a new route under `dashboard/src/app/dashboard/`.

---

## API summary

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/auth/linkedin` | No | Redirect to LinkedIn OAuth |
| GET | `/auth/linkedin/callback` | No | OAuth callback; redirects to dashboard with token |
| GET | `/tasks` | JWT | Pending tasks (for extension) |
| GET | `/tasks/recent` | JWT | Recent tasks (dashboard) |
| POST | `/tasks` | JWT | Create task (`type`, optional `payload`) |
| POST | `/tasks/:id/complete` | JWT | Complete task with `result` |
| GET | `/leads` | JWT | List saved leads |

---

## Production notes

- Set `NODE_ENV=production`, strong `JWT_SECRET`, and production MongoDB.
- Use production URLs for `LINKEDIN_CALLBACK_URL` and `DASHBOARD_URL`; add them to the LinkedIn app.
- In production, use `https` for the API and add `https://your-api.com` to the extension `host_permissions` and update `API_BASE` in the extension.
- Serve dashboard with `npm run build` then `npm run start:dashboard` (or your host’s Node command).
