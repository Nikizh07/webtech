const express = require('express');

const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 499 }
];
let nextId = 3;

app.get('/', (req, res) => {
  res.send('Welcome to Online Store API');
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Missing name or price" });
    const p = { id: nextId++, name, price };
    products.push(p);
    res.json(p);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Exp6 Store API Server running on port ${PORT}`));
