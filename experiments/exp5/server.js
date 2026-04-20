const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Learn HTML & CSS Basics', completed: true },
    { id: 2, title: 'Understand JavaScript DOM Manipulation', completed: false }
];
let idCounter = 3;

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ error: 'Title is required and must be a valid string' });
    }

    const task = { 
        id: idCounter++, 
        title: title.trim(), 
        completed: false 
    };
    
    tasks.push(task);
    res.status(201).json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(t => t.id !== taskId);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ success: true, message: 'Task deleted successfully' });
});

// Catch-all route for frontend
app.get('*', (req, res) => {
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Exp5 Task Manager backend running on http://localhost:${PORT}`);
});
