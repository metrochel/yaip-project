from app import db

# Класс Discipline описывает данные одной дисциплины.
class Disciplines(db.Model):
    discipline_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False, unique=True)
    teacher = db.Column(db.String(256), nullable=False)
    facts_ids = db.Column(db.Text)
    
    def __init__(self, id, name, teacher, factoids):
        self.discipline_id = id
        self.name = name
        self.teacher = teacher
        self.factoids = factoids
    
    
    def get_brief_dict(self):
        return {
            "id": self.discipline_id,
            "name": self.name,
            "teacher": self.teacher
        }


def get_disciplines_list():
    disciplines_list = Disciplines.query.all()
    
    return [discipline.get_brief_dict() for discipline in disciplines_list]