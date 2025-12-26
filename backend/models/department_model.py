from extensions import mongo

class Department:
    def __init__(self, name, description=""):
        self.name = name
        self.description = description

    def to_json(self):
        return {
            "name": self.name,
            "description": self.description
        }