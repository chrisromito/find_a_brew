# Find A Brew

Find A Brew helps you find a brew(ery) near you.

### Prerequisites
- Python >= 3.7
- Node >= 12.4.0
- PostgreSQL >= 10


### Installing

#### Server

Set up the Python virtual environment & install dependencies:

```
python3 -m venv venv
pip install -r requirements.txt
```

#### Client

Change to the "client" directory in the project root & install node dependencies:
```
cd ./client
npm install
```

While still in the "client" directory, run the Webpack build script.
This will compile static files into the 'dist' directory at the project root.
```
npm build
```


#### Database
Ensure that you have a clean PostgreSQL database available locally.  Place the URI for that database in `.env`.  This allows SQLAlchemy/Flask to connect to the database; however, please be aware that this also makes the URI an environment variable.

Once you have a database running and the URI in the appropriate location, go ahead and run the migration script.

Assuming you're in the project root directory:
```
source ./scripts/migrations.sh
```

Your database will now contain a `city` table and a `state` table.  These locations are used to help provide filters that make it easier to find a brew(ery).


### Running the application

Once you have all of the dependencies installed, and your database set up, you're ready to rock.  Fire up the server:

```
source ./scripts/devmode.sh
```


Or, if you'd rather type more:
```

source ./venv/bin/activate
export FLASK_ENV=development
flask run

```

This will kick off the development server, which will now be available at: http://0.0.0.0:5000