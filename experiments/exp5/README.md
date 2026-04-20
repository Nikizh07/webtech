# Exp5 – Task Manager (Node.js REST API)

A task manager app with a REST API backend built with Node.js and Express, and a static frontend served from the `public/` folder.

## Prerequisites

- Node.js 14 or higher
- npm

## Setup

Install dependencies from inside the `exp5/` folder:

```bash
npm install
```

## How to Run

```bash
npm start
```

The server starts on **http://localhost:3000**.

## API Endpoints

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| GET    | /api/tasks     | List all tasks     |
| POST   | /api/tasks     | Add a new task     |
| DELETE | /api/tasks/:id | Delete a task      |

The frontend is served at `http://localhost:3000`.
