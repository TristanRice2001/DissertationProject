from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

def dict_factory(cursor, row):
    rows = {}

    for i, column in enumerate(cursor.description):
        rows[column[0]] = row[i]

    return rows

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET" or not request.form.get("employee-name", ""):
        return render_template("index.html")
    
    name = request.form.get("employee-name", "")
    conn = sqlite3.connect("database.db")
    conn.row_factory = dict_factory
    cursor = conn.cursor()
    employees = cursor.execute(f"SELECT id,name,salary FROM employees WHERE name LIKE '%{name}%';").fetchall()
    return render_template("index.html", employees=employees)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
