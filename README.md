# Client Health Monitoring Dashboard

A modern dashboard for monitoring client health, churn risk, and expansion opportunities.

## Features

- 📊 **Overview Dashboard** - High-level KPIs and risk distribution
- 📈 **Health Dashboard** - Detailed client health scores and metrics table
- 🚨 **Alerts & Playbooks** - Automated alert types and response workflows
- 📖 **How It Works** - Architecture and scoring model documentation

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) to view the dashboard.

### Build

```bash
npm run build
npm start
```

## Dashboard Sections

### Overview
- KPI cards: Accounts at Risk, MRR at Risk, Trending Down, Expansion Opportunities
- Risk distribution visualization
- Total accounts, MRR, and average health score

### Health Dashboard
- Comprehensive table with 15+ client accounts
- Health scores (0-100) with color coding
- Risk tiers: Healthy, Watch, At-Risk, Critical, Expansion
- Usage trends, ticket counts, payment status
- Recommended actions per account

### Alerts & Playbooks
- Three alert types with trigger conditions
- Automated response workflows
- Slack message examples
- Alert routing logic

### How It Works
- 6-step architecture flow
- Scoring model reference
- Risk tier thresholds
- Production reliability guarantees

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Overview.tsx        # Overview dashboard
│   ├── HealthDashboard.tsx # Health metrics table
│   ├── AlertsPlaybooks.tsx # Alerts documentation
│   └── HowItWorks.tsx      # Architecture docs
├── data/
│   └── mockData.ts         # Mock client health data
└── types/
    └── index.ts            # TypeScript types
```

## Data

Currently uses mock data generated in `data/mockData.ts`. To connect to real APIs:

1. Create API routes in `app/api/`
2. Update data fetching in components
3. Replace mock data generators with API calls

## Deployment

This project is ready for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Next.js and deploy

## License

MIT License
