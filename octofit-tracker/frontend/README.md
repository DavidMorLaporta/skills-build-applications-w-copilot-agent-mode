# OctoFit Tracker frontend

## Configure the API URL

For a Codespaces frontend, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using the Codespace name (not the full
URL):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

You can copy `.env.example` to `.env.local` and replace the example name. Vite
reads this variable at startup, so restart the frontend dev server after
changing it. The app sends API requests to
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/[component]/`.

When `VITE_CODESPACE_NAME` is unset, the API client safely uses
`http://localhost:8000`. Run the backend on port `8000` in either environment.

## Start the frontend

```sh
npm run dev --prefix octofit-tracker/frontend
```
