from pprint import pprint
from typing import Any, Callable, Dict, List
from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from sqlalchemy.orm import joinedload, Load, load_only
from find_a_brew.db.locations import City, State


api_views = Blueprint('api_views', __name__, url_prefix='/api')


@api_views.route('/cities/')
def show():
    cities = City.query.join(City.state)
    search = request.args.get('q', '').strip()
    if len(search):
        search_query = '%' + search + '%'
        cities = cities.filter(
            or_(
                City.city.ilike(search_query),
                City.state.has(State.name.ilike(search_query)),
                City.state.has(State.abbreviation.ilike(search_query))
            )
        )
    return jsonify(
        serialize_cities(cities.distinct(City.city).limit(100).all())
    )


def serialize_cities(city_list):
    return [serialize_city(x) for x in city_list]


def serialize_city(city):
    temp = {}
    keys = ['id', 'city', 'city_ascii', 'lat', 'lng', 'zips']
    for key in keys:
        temp[key] = getattr(city, key, None)
    temp['state'] = serialize_state(city.state)
    return temp


def serialize_state(state):
    predicate = props(['id', 'name', 'abbreviation', 'formatted'])
    target = (
        state if isinstance(state, dict)
        else state.__dict__
    )
    return predicate(target)


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
