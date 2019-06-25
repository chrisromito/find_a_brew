import os
import sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.append(
    os.path.dirname(HERE)
)

from find_a_brew.app import create_app
from find_a_brew.db.migrations.cities import run_migration

if __name__ == '__main__':
    flask_app = create_app()
    flask_app.app_context().push()
    run_migration()
