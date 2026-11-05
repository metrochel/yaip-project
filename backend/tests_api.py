from datetime import date, datetime, timedelta
from random import randint
from app import db
from factoid_api import Factoid
from disciplines_api import Discipline
from sqlalchemy import select
import regex

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    discipline = db.Column(db.Integer, nullable=False)
    due = db.Column(db.Date, nullable=False)
    factoids = db.Column(db.Text)
    max_grade = db.Column(db.Integer, nullable=False)
    
    def __init__(self, name, discipline, due, max_grade, factoids):
        self.name = name
        self.discipline = discipline
        self.due = due
        self.max_grade = max_grade
        self.factoids = factoids

    
    def get_dict(self, discipline_names=None):
        dt = datetime(self.due.year, self.due.month, self.due.day)
        # Необходимо здесь умножить на 1 000, так как timestamp считает секунды,
        # тогда как в JS Date.now() возвращает миллисекунды.
        timestamp = dt.timestamp() * 1000
        return {
            "id": self.id,
            "name": self.name,
            "discipline": self.discipline if discipline_names is None else discipline_names[self.discipline],
            "due": timestamp,
            "maxGrade": self.max_grade
        }


def transform_test_factoids(raw_factoids):
    modules = {int(m) for m in regex.findall(r"\{(\d+)\}", raw_factoids)}

    processed_factoids = []

    for module in modules:
        query = select(Factoid.id).where(Factoid.module == module)
        factoids = db.session.execute(query).scalars().all()
        processed_factoids.extend(factoids)
        raw_factoids.replace(f"{{{module}}}", "")
        raw_factoids.replace(";;", ";")

    return ";".join([str(i) for i in processed_factoids])



def list_tests():
    tests_list = Test.query.all()
    discipline_names_query = select(Discipline.id, Discipline.name)
    discipline_names_result = db.session.execute(discipline_names_query).all()
    discipline_names = {k:v for k,v in discipline_names_result}

    return [test.get_dict(discipline_names) for test in tests_list]


def create_test(name: str, discipline: int, due: date, max_grade: int, raw_factoids: str) -> int:
    factoids = transform_test_factoids(raw_factoids)
    
    test = Test(name, discipline, due, max_grade, factoids)
    db.session.add(test)
    db.session.commit()

    return test.id