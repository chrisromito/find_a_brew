import os
from dotenv import load_dotenv
load_dotenv()


DB_URL = os.getenv(
    'DB_URI',
    os.getenv('DB_URL')
)

SQLALCHEMY_DATABASE_URI = DB_URL


class Config:
    DB_URL = DB_URL
    SQLALCHEMY_DATABASE_URI = DB_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
