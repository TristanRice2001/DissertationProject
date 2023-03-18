import sqlite3
import random

def get_names():
    with open("names.txt", "r") as f:
        return f.readlines()

def insert_into_db(cur, name, salary):
    statement = f"INSERT INTO employees (name, salary) VALUES ('{name}', {salary});"
    cur.execute(statement)

emp_names = get_names()
salaries = [20000, 30000, 25000, 40000, 50000, 100000]
conn = sqlite3.connect("database.db")
cur = conn.cursor()

for i in range(500):
    name = random.choice(emp_names)
    salary = random.choice(salaries)
    insert_into_db(cur, name, salary)

conn.commit()
