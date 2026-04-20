from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'super_secret_key_for_flash_messages'

# Mock database
users = {
    "harini": {"password": "123", "balance": 10000},
    "student": {"password": "password", "balance": 500}
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Please enter both username and password.", "error")
        elif username in users and users[username]["password"] == password:
            flash("Successfully logged in!", "success")
            return redirect(url_for('balance', username=username))
        else:
            flash("Invalid credentials. Please try again.", "error")
            
    return render_template('login.html')

@app.route('/balance/<username>')
def balance(username):
    if username in users:
        user_balance = users[username]["balance"]
        return render_template('balance.html', username=username, balance=user_balance)
    
    flash("User not found or unauthorized.", "error")
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
