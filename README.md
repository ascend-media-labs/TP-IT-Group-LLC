# TP iT GROUP LLC

A global technology powerhouse delivering next-gen IT services, deep-tech engineering, and strategic workforce solutions across USA, India, UK, Australia, and Canada.

## Tech Stack

- **Framework**: TanStack Start / React 19 / Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation

```sh
npm install
```

### Development Server

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Database and admin account

The admin panel (`/admin`) and the website forms need MySQL (Laragon locally). The setup commands
need Node.js 22.18 or newer.

```sh
npm run db:setup                          # create or update tables
npm run admin:create -- you@example.com   # create an admin, or reset a password
```

There is no default admin account. Run `db:setup` again after pulling changes that touch the
database. Settings are read from `.env`; see `.env.example`.

### Security notes

- Every API route is declared `public` or `admin` in `src/lib/api-handler.ts`. Admin routes need a
  session cookie.
- Rate limits are held in memory, per server instance. Add limits at the hosting provider too.
- Image uploads are written to `public/` on the server's disk. This works in local development, but
  not on serverless hosting such as Cloudflare, and files added after a build may not be served.
  Use object storage for production uploads.

### Production Build

```sh
npm run build
```
