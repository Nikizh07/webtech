document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const errorMessage = document.getElementById('errorMessage');
    const totalTasks = document.getElementById('totalTasks');

    // Load tasks on startup
    fetchTasks();

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        
        if (!title) {
            showError('Task cannot be empty');
            return;
        }

        if (title.length > 100) {
            showError('Task must be less than 100 characters');
            return;
        }

        hideError();
        await addTask(title);
    });

    async function fetchTasks() {
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('Failed to fetch tasks');
            
            const tasks = await res.json();
            renderTasks(tasks);
        } catch (error) {
            showError('Could not load tasks from server');
            console.error(error);
        }
    }

    async function addTask(title) {
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            
            if (!res.ok) throw new Error('Failed to add task');
            
            taskInput.value = '';
            fetchTasks();
        } catch (error) {
            showError('Could not add task. Please try again.');
        }
    }

    window.deleteTask = async function(id) {
        try {
            const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete task');
            fetchTasks();
        } catch (error) {
            showError('Could not delete task.');
        }
    };

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        totalTasks.textContent = `Total: ${tasks.length}`;

        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
            return;
        }

        tasks.forEach(t => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-title">${escapeHTML(t.title)}</span> 
                <button class="delete-btn" onclick="deleteTask(${t.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Basic XSS prevention
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
});
