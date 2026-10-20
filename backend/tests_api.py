from datetime import date, datetime, timedelta
from random import randint

class Test:
    id = 0
    name = ""
    discipline = ""
    due = date.today()
    passed = False
    score = 0
    max_score = 0
    
    def __init__(self, id, name, discipline, due, passed, score, max_score):
        self.id = id
        self.name = name
        self.discipline = discipline
        self.due = due
        self.passed = passed
        self.score = score
        self.max_score = max_score
    
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
            "passed": self.passed,
            "score": self.score,
            "maxScore": self.max_score
        }

def list_tests():
    RANGE = 5
    def generate_test(i):
        idx = i
        if i < 0:
            idx += RANGE * 2 + 1
        max_grade = 20
        grade = randint(0, max_grade)
        d = date.today() + timedelta(days=i)
        dt = datetime(d.year, d.month, d.day)
        timestamp = dt.timestamp()
        print(timestamp)
        return Test(idx, f"Тест {idx + 1}", "Дисциплина", date.today() + timedelta(days=randint(-5, 5)), grade > max_grade // 2, grade, max_grade)
    
    tests_list = [generate_test(i) for i in range(-RANGE, RANGE + 1)]
    return [test.to_dict() for test in tests_list]