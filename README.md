# WC26 Chatbot

Winter Cup 2026 — AI-powered tournament assistant for a Finnish winter simulator golf tournament.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **N8N Cloud** — AI agent backend with OpenAI GPT-4o-mini
- **Vercel** — deployment

## Features

- Finnish-primary AI assistant that answers tournament questions
- Natural registration flow — collects name, phone, handicap
- Lead notification via email when registration completes
- Dark winter design system — Blue vs Red team aesthetics
- Mobile-responsive two-column layout

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in N8N_WEBHOOK_URL in .env.local
npm run dev
```

## Environment

| Variable | Description |
|---|---|
| `N8N_WEBHOOK_URL` | N8N webhook URL — keep this server-side only, never expose to client |

## N8N Workflow

The app proxies all chat requests through `/api/chat` to an N8N webhook.

Expected request body:
```json
{ "message": "string", "sessionId": "string" }
```

Expected response:
```json
{ "success": true, "data": { "response": "string", "leadCaptured": false } }
```
