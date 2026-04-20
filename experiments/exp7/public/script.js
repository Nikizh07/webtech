document.addEventListener('DOMContentLoaded', () => {
    // We assume socket.io is loaded via the script tag in HTML
    if (typeof io === 'undefined') {
        alert("Error: Socket.io library not loaded.");
        return;
    }

    const socket = io();
    
    const chatForm = document.getElementById('chatForm');
    const msgInput = document.getElementById('msgInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messagesContainer');
    const statusIndicator = document.getElementById('statusIndicator');

    // Connection events
    socket.on('connect', () => {
        statusIndicator.className = 'status online';
        sendBtn.disabled = false;
        msgInput.placeholder = "Type your message here...";
        addSystemMessage("Connected to Support Server.");
    });

    socket.on('disconnect', () => {
        statusIndicator.className = 'status offline';
        sendBtn.disabled = true;
        msgInput.placeholder = "Reconnecting...";
        addSystemMessage("Disconnected from server. Retrying...");
    });

    // Receive messages
    socket.on('receiveMessage', (data) => {
        const type = data.sender.toLowerCase() === 'user' ? 'user' : 'bot';
        addMessage(data.text, type);
    });

    // Send messages
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = msgInput.value.trim();
        
        if (msg) {
            socket.emit('sendMessage', msg);
            msgInput.value = '';
            msgInput.focus();
        }
    });

    // Enable/disable send button based on input
    msgInput.addEventListener('input', () => {
        sendBtn.disabled = msgInput.value.trim() === '' || !socket.connected;
    });

    // UI Helper Functions
    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        
        const p = document.createElement('p');
        p.textContent = text;
        
        div.appendChild(p);
        messagesContainer.appendChild(div);
        
        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addSystemMessage(text) {
        const div = document.createElement('div');
        div.className = 'message system';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        div.appendChild(p);
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
