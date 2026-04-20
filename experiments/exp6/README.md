# Exp6 – Online Store API (Node.js)

A REST API for a simple online store built with Node.js and Express.

## Prerequisites

- Node.js 14 or higher
- npm

## Setup

Install dependencies from inside the `exp6/` folder:

```bash
npm install
```

## How to Run

```bash
npm start
```

The server starts on **http://localhost:5000**.

## API Endpoints

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| GET    | /               | Welcome message      |
| GET    | /api/products   | List all products    |
| POST   | /api/products   | Add a new product    |

### Example: Add a Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Tablet", "price": 299}'
```
