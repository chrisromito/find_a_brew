from find_a_brew.db.base import db, Model


class State(Model, db.Model):
    """
    U.S. State.
    Remember: States have many cities. xD
    """
    __tablename__ = 'state'
    name = db.Column(db.Text, nullable=False)
    abbreviation = db.Column(db.String(10), nullable=False)
    formatted = db.Column(db.Text, nullable=True)
    cities = db.relationship('City', backref='state', lazy=True)


class City(Model, db.Model):
    __tablename__ = 'city'
    city = db.Column(db.String(200), nullable=False)
    city_ascii = db.Column(db.String(200), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    zips = db.Column(db.JSON, nullable=True)
    # state_id = db.Column(db.String(200), nullable=True)
    state_id = db.Column(db.Integer, db.ForeignKey('state.id'))
