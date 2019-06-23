import os
from dotenv import load_dotenv
load_dotenv()


DB_URL = os.getenv(
    'DB_URI',
    os.getenv('DB_URL')
)

SQLALCHEMY_DATABASE_URI = DB_URL


print(SQLALCHEMY_DATABASE_URI)


class Config:
    DB_URL = DB_URL
    SQLALCHEMY_DATABASE_URI = DB_URL
