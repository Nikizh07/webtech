from flask import Flask, request, redirect, url_for, render_template_string

app = Flask(__name__)

users = {"harini": {"password": "123", "balance": 10000}}

home_html = '''
<h2>Welcome to Student Bank</h2>
<a href="/login">Login Here</a>
'''

login_html = '''
<h2>Login</h2>
{% if error %}<p style="color:red">{{ error }}</p>{% endif %}
<form method="POST">
  Username: <input type="text" name="username"><br><br>
  Password: <input type="password" name="password"><br><br>
  <button type="submit">Login</button>
</form>
'''

balance_html = '''
<h2>Welcome {{ username }}</h2>
<p>Your balance is: ${{ balance }}</p>
<a href="/login">Logout</a>
'''

@app.route('/')
def home():
    return render_template_string(home_html)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        u = request.form.get("username")
        p = request.form.get("password")
        if u in users and users[u]["password"] == p:
            return redirect(url_for('balance', username=u))
        return render_template_string(login_html, error="Invalid credentials")
    return render_template_string(login_html)

@app.route('/balance/<username>')
def balance(username):
    if username in users:
        return render_template_string(balance_html, username=username, balance=users[username]["balance"])
    return "User not found", 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
