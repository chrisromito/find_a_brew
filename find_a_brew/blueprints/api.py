from typing import Any, Callable, Dict, List
from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from sqlalchemy.orm import joinedload, Load, load_only
from find_a_brew.db.locations import City, State


api_views = Blueprint('api_views', __name__, url_prefix='/api')


@api_views.route('/cities')
def show():
    # cities = City.query.options(joinedload(City.state))
    cities = City.query.join(City.state, aliased=True)
    search = request.args.get('q', '').strip()
    if len(search):
        search_query = '%' + search + '%'
        cities = cities.filter(
            or_(
                City.city.ilike(search_query),
                State.name.ilike(search_query),
                State.abbreviation.ilike(search_query)
            )
        )
    return jsonify(
        parse_cities(cities.all())
    )


def parse_cities(city_list):
    parse_predicate = project(['id', 'city', 'city_ascii', 'lat', 'lng', 'zips', 'state'])
    city_dicts = []
    for city in city_list:
        if not isinstance(city, dict):
            city = city.__dict__
        city_dicts.append(city)
    city_dicts = parse_predicate(city_dicts)
    # Serialize each city's state, return a list of updated copies of each city dictionary
    parsed_cities = [
        {**x, **{
            'state': parse_state(x.get('state', {}))
        }}
        for x in city_dicts
    ]
    return parsed_cities


def parse_state(state):
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
