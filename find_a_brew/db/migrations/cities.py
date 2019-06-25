"""
    Provides a migration function (run_migration), which has 3 primary functions:
    Step 1. Responsible for dropping & creating our app's tables
    Step 2. Imports the states from our 'states' migration, & commits them to the DB
    Step 3. Parses the CSV containing cities, their states, zip codes, etc, transforms them
      into SQLAlchemy Objects, maps them to their associated states (see #2),
      & commits everything to the DB
"""

from typing import Any, Callable, Dict, List
import csv
import click
from flask.cli import AppGroup
import os

from find_a_brew.db.base import db
from find_a_brew.db.locations import City, State


from .states import STATES


# Generics
def props(keys):
    return (lambda d: {
        k: v
        for k, v in d.items()
        if k in keys
    })

def project(keys):
    pred = props(keys)
    return (lambda dict_list: [
        pred(x) for x in dict_list
    ])



# Step 1.
def setup_db():
    db.drop_all()
    db.create_all()
    return True


# Step 2.
def import_states():
    for state in STATES:
        state_data = {**state, **{
            'formatted': state.get('name').lower().replace(' ', '_')
        }}
        new_state = State(**state_data)
        db.session.add(new_state)
    db.session.commit()
    return True


# Step 3.
def import_cities():
    print('States succesfully imported.  \n\nParsing City CSV...')
    city_reader = CityReader(None).parse(CITIES_PATH)
    city_rows = [CityReader(x) for x in city_reader.value()]
    city_map = CityMap(None).set_state_context(State.query.all())
    for city_row in city_rows:
        with_new_city = city_map.create(city_row)
        city_map = with_new_city
    print('Cities successfully parsed and lifted.  Finalizing process...')
    # Make sure the new cities are added to the DB session
    for city in city_map._data:
        db.session.add(city)
    print('Committing DB session...')
    db.session.commit()
    return city_map


HERE = os.path.dirname(os.path.abspath(__file__))

ROOT_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            HERE
        )
    )
)

# CSV Directory == '../../../external_data/'
CSV_DIR = os.path.join(ROOT_DIR, 'external_data')

CITIES_FILENAME = 'uscitiesv1.5.csv'
# cities_path == '../../../external_data/uscitiesv1.5.csv'
CITIES_PATH = os.path.join(CSV_DIR, CITIES_FILENAME)


class CityReader:
    """
    Helper for reading & parsing the City CSV Data
    """
    def __init__(self, value):
        self._value = value

    def value(self):
        return self._value

    def map(self, fn):
        return __class__(
            fn(self.value())
        )

    def parse(self, file_path):
        accum = []
        with open(file_path, newline='') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                accum.append(row)
        return __class__(accum)
    
    def project(self, keys):
        pred = project(keys)
        return self.map(pred)


class CityMap:
    def __init__(self, context, data=None):
        self._context = context
        self._data = data
    
    def map(self, fn: Callable):
        return __class__(
            self._context,
            fn(self._context, self._data)
        )
    
    def set_state_context(self, states: List[State]):
        abbreviation_map = {}
        for state in states:
            abbreviation_map[state.abbreviation] = state
        return __class__(abbreviation_map, self._data)
    
    def get_state_id(self, abbreviation: str)-> Any:
        state = self._context.get(abbreviation)
        if state:
            return state.id
        return None

    def create(self, city_reader: CityReader):
        data = city_reader.value()
        city_fields = {
            'city': data.get('city'),
            'city_ascii': data.get('city_ascii'),
            'lat': float(data.get('lat')),
            'lng': float(data.get('lng')),
            'zips': try_to_parse_zipcodes(data.get('zips')),
            'state_id': self.get_state_id(data.get('state_id'))
        }
        city = City(**city_fields)
        return self.map(
            (lambda ctx, d: (d or []) + [city])
        )


def try_to_parse_zipcodes(zip_codes: str)-> List[int]:
    if (not zip_codes) or str(zip_codes).__len__() < 1:
        return []
    numbers = []
    str_list = [x for x in zip_codes.split(' ') if len(x)]
    for zip_code in str_list:
        try:
            numbers.append(int(zip_code))
        except (TypeError, ValueError):
            # Then it was an empty string to begin with, let it slide
            pass
    return numbers


def run_migration():
    # from find_a_brew import create_app
    # app = create_app()
    # app.app_context().push()
    # Step 1
    setup_db()
    print('DB is set up.')
    print('Importing States...')
    # Step 2
    import_states()
    # Step 3
    import_cities()
    print('\n\nMigration Complete\n\n')
    return True
