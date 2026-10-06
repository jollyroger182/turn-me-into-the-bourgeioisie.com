# turn-me-into-the-bourgeioisie.com

A satirical, loving parody of [turn-me-into-a-girl.com](https://turn-me-into-a-girl.com), about class instead of gender.

Static site in `public/`, served as a Cloudflare Worker with static assets on the custom domain `turn-me-into-the-bourgeioisie.com`.

## Develop

```sh
npm install
npm run dev
```

## Deploy

Pushes to `main` deploy through GitHub Actions (`.github/workflows/deploy.yml`). Repo secrets:

- `CLOUDFLARE_TOKEN`: an API token with **Workers Scripts: Edit**, **Workers Routes: Edit** and **Zone: Read** on the `turn-me-into-the-bourgeioisie.com` zone (the "Edit Cloudflare Workers" template works).
- `CLOUDFLARE_ACCOUNT_ID` (optional): only needed if the token has access to more than one account.
