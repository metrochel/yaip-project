from app import db
from disciplines_api import Discipline
from sqlalchemy import select, func

class Factoid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False, unique=True)
    discipline = db.Column(db.Integer, nullable=False)
    module = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text)

    def __init__(self, name, discipline, module, content):
        self.name = name
        self.discipline = discipline
        self.module = module
        self.content = content


    def __repr__(self):
        return self.get_dict()

    def get_dict(self, omit_module=False, brief_content=False):
        dct = {
            "id": self.id,
            "name": self.name,
            "discipline": self.discipline,
            "content": self.content
        }
        
        if not omit_module:
            dct["module"] = self.module
        
        if brief_content:
            period_idx = self.content.find(".")
            newl_idx = self.content.find("\n")

            if period_idx == -1: period_idx = len(self.content) + 1
            if newl_idx == -1: newl_idx = len(self.content) + 1

            dct["content"] = self.content[:min(period_idx + 1, newl_idx)]
        
        return dct


def create_factoid(name, discipline, module, content):
    discipline_ids = db.session.execute(select(Discipline.id)).scalars().all()
    if discipline not in discipline_ids:
        return -1

    factoid = Factoid(name, discipline, module, content)
    db.session.add(factoid)
    db.session.commit()

    return factoid.id


def list_factoids(id):
    max_module = db.session.query(
        func.max(Factoid.module)
    ).filter(Factoid.discipline == id).scalar()
    if (max_module is None):
        return []
    
    factoids_list = []
    for module in range(1, max_module + 1):
        factoids_i = db.session.execute(select(Factoid).filter_by(discipline=id, module=module)).scalars().all()
        factoids_list.append(
            [factoid.get_dict(omit_module=True, brief_content=True) for factoid in factoids_i]
        )

    return factoids_list



def get_factoid(id):
    try:
        data = db.session.execute(select(Factoid).filter_by(id=id)).scalar_one()
        return data.get_dict()
    except:
        return None