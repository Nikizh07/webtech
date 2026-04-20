const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Learn HTML', completed: true },
    { id: 2, title: 'Learn Node.js', completed: false }
];
let idCounter = 3;

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
    const task = { id: idCounter++, title: req.body.title, completed: false };
    tasks.push(task);
    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Exp5 Task Manager running on port ${PORT}`));
