from flask import Flask, request, render_template
import sqlite3
import time

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method != "POST":
        return render_template("index.html")

    ticket_content = request.form.get("ticket", "")
    
    if not ticket_content:
        return render_template("index.html", error="Please enter ticket information")
    
    try:
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        query = "INSERT INTO it_tickets (ticket_content) VALUES ('{}')".format(ticket_content)
        cursor.execute(query)
    except:
        pass

    return render_template("index.html", success="IT ticket submitted")

if __name__ == '__main__':
    app.run(debug=True, port=80, host="0.0.0.0")

