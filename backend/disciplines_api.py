# Класс Discipline описывает данные одной дисциплины.
class Discipline:
    id = 0
    name = ""
    teacher = ""
    factoids = []
    
    def __init__(self, id, name, teacher, factoids):
        self.id = id
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
    disciplines_list = [
        Discipline(i, f"Дисциплина {i + 1}", f"Преподаватель {i + 1}", [])
        for i in range(5)
    ]
    
    return [discipline.get_brief_dict() for discipline in disciplines_list]