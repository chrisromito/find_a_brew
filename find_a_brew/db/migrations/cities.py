import os
import csv
from find_a_brew.db.base import db
from find_a_brew.db.locations import City, State
from .states import STATES
from find_a_brew import create_app

app = create_app()
app.app_context().push()

HERE = os.path.dirname(os.path.abspath(__file__))


# CSV Directory == '../../../external_data/'
# zip_code file == '../../../external_data/uscitiesv1.5.csv'
ROOT_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            HERE
        )
    )
)

CSV_DIR = os.path.join(ROOT_DIR, 'external_data')

CITIES_FILENAME = 'uscitiesv1.5.csv'
CITIES_PATH = os.path.join(CSV_DIR, CITIES_FILENAME)


def project(keys):
    return (lambda d: {
        k: v
        for k, v in d.items()
        if k in keys
    })


def import_states():
    for state in STATES:
        state_data = {**state, **{
            'formatted': state.get('name').lower().replace(' ', '_')
        }}
        new_state = State(**state_data)
        db.session.add(new_state)
    db.session.commit()



copy_paste = """


from find_a_brew.db.migrations.cities import *

db.create_all(app=app)

"""