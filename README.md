# OfferUp MVP

This is a Minimum Viable Product (MVP) for "OfferUp," a local daily deals and experiences marketplace similar to Groupon. The application features three distinct portals catering to different user roles:

- **Consumer Storefront:** Allows users to browse active deals, view deal details, simulate a checkout process, and manage purchased vouchers.
- **Merchant Portal:** Provides merchants with a dashboard to track key metrics (sales, active deals, pending redemptions), a tool to create new deals (which enter a pending state), and a tool to redeem consumer vouchers.
- **Admin Dashboard:** Enables platform administrators to moderate deals (approve or reject pending deals) and view a global ledger that calculates platform commissions and merchant payouts.

The application is built using Next.js (App Router), React, TypeScript, and Tailwind CSS. It currently relies on a robust mock data system (`src/lib/mock-data.ts`) to simulate a backend database (PostgreSQL/Supabase).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Options

You can deploy this Next.js application using various hosting providers. Some examples include:

### Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### AWS Amplify
AWS Amplify provides full-stack hosting for Next.js applications, supporting SSR and API routes.

### Netlify
Netlify is another excellent option for hosting Next.js applications, offering seamless GitHub integration and CI/CD.

### Custom Server / Docker
You can build the application using `npm run build` and start it with `npm run start` to deploy it on your own VPS or a containerized environment using Docker.