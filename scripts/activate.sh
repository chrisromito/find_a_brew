#!/usr/bin/env bash
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export SCRIPT_DIR=$HERE
echo $HERE
cd $HERE
cd ..
. venv/bin/activate
export FLASK_ENV=development
