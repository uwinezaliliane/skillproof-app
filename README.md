# SkillProof

SkillProof is a simple MVP for showcasing verified skills and evidence. It lets users present a skill portfolio with proof points, confidence levels, and recent achievements.

## Features

- Skill dashboard with categories
- Proof items and supporting evidence
- Project-based verification cards
- Quick add form for new skill records
- REST API to serve skill data

## Stack

- Node.js
- Express
- Vanilla JavaScript + HTML + CSS

## Run locally

```bash
npm install
npm start
```

Then open: http://localhost:3000

## Project structure

- `server.js` — Express server and API
- `public/` — frontend assets
- `package.json` — project scripts and dependencies

## Default API

- `GET /api/skills` — returns sample skill proof data
- `POST /api/skills` — adds a new skill record

## License

MIT
