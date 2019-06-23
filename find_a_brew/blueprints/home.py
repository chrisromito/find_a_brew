from flask import Blueprint, render_template, abort

home_views = Blueprint('home_views', __name__)

@home_views.route('/')
def show():
    return render_template('home_views/index.html')

