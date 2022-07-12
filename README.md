# Social Activities Web

[![GitHub Super-Linter](https://github.com/HackingGate/social-activities-web/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

## Getting Started

### 1. Download project and install dependencies

Download this project:

```bash
git clone https://github.com/HackingGate/social-activities-web.git
```

Install npm dependencies:

```bash
cd social-activities-web
yarn install
```

Generate prisma and nexus:

```bash
yarn generate
```

### 2. Create database

Create mongodb and edit `.env` file

```env
DATABASE_URL=""
```

### 3. Start the app

```bash
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
