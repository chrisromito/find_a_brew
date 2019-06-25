#!/usr/bin/env bash
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $HERE
cd $HERE
cd ..
. venv/bin/activate
export FLASK_APP=find_a_brew
export FLASK_ENV=development

python find_a_brew/run_migration.py
