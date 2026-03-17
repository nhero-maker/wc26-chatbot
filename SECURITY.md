# Security Guide — WC26 Chatbot

This document covers secret management, incident response, and access control for the WC26 app.

---

## How Secrets Are Structured

| Variable | What it protects | Where it's used |
|---|---|---|
| `N8N_WEBHOOK_URL` | Chat webhook endpoint | API route: `/api/chat` |
| `N8N_WEBHOOK_SECRET` | Chat webhook auth | Sent as `x-wc26-secret` header |
| `N8N_BASE_URL` | Player/admin webhook base URL | All `/api/player/*` and `/api/admin/*` routes |
| `N8N_PLAYER_SECRET` | Player/admin API auth | Sent as `x-wc26-secret` header |
| `ADMIN_EMAILS` | Admin role assignment | Set server-side on sign-in |

**All secrets are server-side only.** They live in `.env.local` (local) or Vercel Environment Variables (production) and are never sent to the browser.

---

## Where to Set Secrets

### Local development
```
.env.local   ← gitignored, never committed
```
Copy `.env.example` → `.env.local` and fill in real values.

### Production (Vercel)
1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**
2. Add each variable for **Production**, **Preview**, and **Development** environments
3. Redeploy after changing any variable

---

## Secret Rotation Procedure

### If N8N_WEBHOOK_SECRET or N8N_PLAYER_SECRET is leaked

1. **Generate a new secret:**
   ```bash
   openssl rand -hex 32
   ```
2. **Update n8n:** Edit the Webhook node in the affected n8n workflow — update the expected `x-wc26-secret` header value
3. **Update Vercel:** Replace the old value in Vercel Environment Variables
4. **Redeploy:** Trigger a new Vercel deployment (push a commit or manually redeploy)
5. **Verify:** Test sign-in and a chat message to confirm the new secret works

### If N8N_WEBHOOK_URL or N8N_BASE_URL is leaked

The webhook URL alone is not enough to make valid requests — all requests also require the `x-wc26-secret` header. However, as a precaution:
1. Deactivate the n8n workflow, update the webhook path, reactivate
2. Update the URL in Vercel Environment Variables and redeploy

### If a user session token is compromised

Session tokens are issued by the n8n backend, not by this app. To invalidate all sessions:
1. Rotate `N8N_PLAYER_SECRET` (forces all existing tokens to fail)
2. Affected users will be signed out and must sign in again

---

## Admin Access

### Granting admin access
1. Add the user's email to `ADMIN_EMAILS` in Vercel Environment Variables (comma-separated)
2. Redeploy the app
3. The user signs in — the server sets their `wc26_admin` cookie automatically

### Revoking admin access
1. Remove the email from `ADMIN_EMAILS`
2. Redeploy the app
3. The user's admin cookie will be rejected on their next request (or immediately if you clear their session)

### How admin auth works
- Admin is granted via an `httpOnly` cookie (`wc26_admin=1`) set **server-side only** during sign-in
- The check happens in `lib/auth.ts` → `isAdmin()`
- Every admin API route calls `isAdmin(req)` before processing — 403 if it fails
- Clients cannot forge the admin cookie (it's `httpOnly`)

---

## Session Cookies

Both `wc26_session` and `wc26_admin` cookies are set with:

```
HttpOnly: true       — not accessible to JavaScript (prevents XSS token theft)
Secure: true         — HTTPS only in production
SameSite: strict     — not sent in cross-site requests (prevents CSRF)
MaxAge: 7 days
```

---

## Rate Limits in Place

| Endpoint | Limit |
|---|---|
| `/api/chat` | 20 requests/minute per IP |
| `/api/auth/signin-request` | 5 requests/minute per IP |
| `/api/auth/register` | 5 requests/minute per IP |

Rate limits are in-memory per serverless instance. If abuse is detected, upgrade to [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for persistent cross-instance rate limiting.

---

## Dependency Security

Run `npm audit` periodically to check for vulnerabilities:
```bash
npm audit
npm audit fix   # auto-fix where possible
```

---

## What NOT to Do

- Never add `NEXT_PUBLIC_` prefix to any secret — this exposes it to the browser bundle
- Never log `process.env.*` secret values in `console.log`
- Never commit `.env.local` — it is gitignored; verify with `git check-ignore -v .env.local`
- Never hardcode webhook URLs or secrets in source code
