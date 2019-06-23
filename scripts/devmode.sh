#!/usr/bin/env bash
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $HERE
cd $HERE
cd ..
. venv/bin/activate
source ./scripts/run_flask_dev.sh