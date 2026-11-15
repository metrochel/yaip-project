from datetime import date, datetime, timedelta
from random import randint
from app import db
from factoid_api import Factoid
from disciplines_api import get_discipline_names
from sqlalchemy import select, or_
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

    
    def get_dict(self):
        discipline_names = get_discipline_names()
        dt = datetime(self.due.year, self.due.month, self.due.day)
        # Необходимо здесь умножить на 1 000, так как timestamp считает секунды,
        # тогда как в JS Date.now() возвращает миллисекунды.
        timestamp = dt.timestamp() * 1000

        factoids_ids = [int(i) for i in self.factoids.split(";")]
        factoids_query = select(Factoid).filter(or_(*[Factoid.id == fid for fid in factoids_ids]))
        factoids = db.session.execute(factoids_query).all()
        factoids_dicts = [row.t[0].get_dict(brief_content=True) for row in factoids]

        return {
            "id": self.id,
            "name": self.name,
            "discipline": self.discipline if discipline_names is None else discipline_names[self.discipline],
            "due": timestamp,
            "maxGrade": self.max_grade,
            "factoids": factoids_dicts
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
    return [test.get_dict() for test in tests_list]


def get_test(test_id: int):
    test_query = select(Test).filter_by(id=test_id)
    test_data = db.session.execute(test_query).one_or_none()
    if test_data is None: return None

    return test_data.t[0].get_dict()


def create_test(name: str, discipline: int, due: date, max_grade: int, raw_factoids: str) -> int:
    factoids = transform_test_factoids(raw_factoids)
    
    test = Test(name, discipline, due, max_grade, factoids)
    db.session.add(test)
    db.session.commit()

    return test.id