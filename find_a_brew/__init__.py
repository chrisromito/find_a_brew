import os
from flask import Flask
from find_a_brew.config import Config


def create_app(test_config=None):
    # create and configure the app
    app = Flask(
        __name__,
        # instance_relative_config=True,
        static_folder='../client/dist',
        static_url_path='/static'
    )
    app.config.from_object(Config)

    if test_config:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    # App-level imports
    from find_a_brew.db.base import db
    from find_a_brew.blueprints import home, api
    # Set up DB
    db.init_app(app)
    # Register blueprints (home + API)    
    app.register_blueprint(home.home_views)
    return app