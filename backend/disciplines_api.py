from app import db

# Класс Discipline описывает данные одной дисциплины.
class Discipline(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False, unique=True)
    teacher = db.Column(db.String(256), nullable=False)
    
    def __init__(self, name, teacher, factoids):
        self.name = name
        self.teacher = teacher
        self.factoids = factoids
    
    
    def get_brief_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "teacher": self.teacher
        }


def get_disciplines_list():
    disciplines_list = Discipline.query.all()
    
    return [discipline.get_brief_dict() for discipline in disciplines_list]


def create_discipline(name, teacher):
    discipline = Discipline(name, teacher, "")

    db.session.add(discipline)
    db.session.commit()

    return discipline.id