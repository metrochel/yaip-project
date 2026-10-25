from datetime import date, datetime, timedelta
from random import randint
from app import db

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    discipline = db.Column(db.Integer, nullable=False)
    due = db.Column(db.Date, nullable=False)
    factoids = db.Column(db.Text)
    max_grade = db.Column(db.Integer, nullable=False)
    
    def __init__(self, id, name, discipline, due, passed, score, max_grade):
        self.id = id
        self.name = name
        self.discipline = discipline
        self.due = due
        self.passed = passed
        self.score = score
        self.max_grade = max_grade

    
    def to_dict(self):
        dt = datetime(self.due.year, self.due.month, self.due.day)
        # Необходимо здесь умножить на 1 000, так как timestamp считает секунды,
        # тогда как в JS Date.now() возвращает миллисекунды.
        timestamp = dt.timestamp() * 1000
        return {
            "id": self.id,
            "name": self.name,
            "discipline": self.discipline,
            "due": timestamp,
            "maxGrade": self.max_grade
        }

def list_tests():
    tests_list = Test.query.all()

    return [test.get_brief_dict() for test in tests_list]