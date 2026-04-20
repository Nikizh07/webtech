from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

users = {
    "harini": {"password": "2454", "balance": 10000}
}

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        if username in users and users[username]["password"] == password:
            return redirect(url_for('balance', username=username))
        return render_template("login.html", error="Invalid credentials")
    return render_template("login.html")

@app.route('/balance/<username>')
def balance(username):
    if username in users:
        return render_template("balance.html", username=username,
                               balance=users[username]["balance"])
    return "User not found", 404

if __name__ == '__main__':
    app.run(debug=True)
