#!/bin/bash

set -e

trap ctrl_c INT

function ctrl_c() {
    exit 1
}

function usage() {
    me=$(basename "$0")
    echo
    echo "Usage: $me generate|build|clean [sample_name]"
    echo
    exit 2
}

function generateProject() {
    cd "$mydir"
    dir=$1
    JBOOTER=$dir
    APP_FOLDER="$JBOOTER_SAMPLES/$dir-sample"
    UAA_APP_FOLDER="$JBOOTER_SAMPLES/$uaa-sample"
    echo "*********************** Copying entities for $dir-sample"
    source ./scripts/01-generate-entities.sh
    echo "*********************** Building $dir-sample"
    source ./scripts/02-generate-project.sh
    cd "$mydir"
}

function buildProject() {
    cd "$mydir"
    dir=$1
    JBOOTER=$dir
    APP_FOLDER="$JBOOTER_SAMPLES/$dir-sample"
    UAA_APP_FOLDER="$JBOOTER_SAMPLES/$uaa-sample"
    generateProject "$1"
    echo "*********************** Testing $dir-sample"
    source ./scripts/04-tests.sh
    cd "$mydir"
}

function cleanProject() {
    dir=$1
    echo "*********************** Cleaning $dir"
    rm -rf "$JBOOTER_SAMPLES/$dir"
}

mydir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
JBOOTER_SAMPLES="$mydir/samples"

if [ "$1" = "build" ]; then
    if [ "$2" != "" ]; then
        buildProject "$2"
    else
        for dir in $(ls -1 "$JBOOTER_SAMPLES"); do
            if [ -f "$JBOOTER_SAMPLES/$dir/.yo-rc.json" ]; then
                buildProject "$dir"
            else
                echo "$dir: Not a JBOOTER project. Skipping"
            fi
        done
    fi
elif [ "$1" = "generate" ]; then
    if [ "$2" != "" ]; then
        generateProject "$2"
    else
        for dir in $(ls -1 "$JBOOTER_SAMPLES"); do
            if [ -f "$JBOOTER_SAMPLES/$dir/.yo-rc.json" ]; then
                generateProject "$dir"
            else
                echo "$dir: Not a JBOOTER project. Skipping"
            fi
        done
    fi
elif [ "$1" = "clean" ]; then
    if [ "$2" != "" ]; then
        cleanProject "$2-sample"
    else
        for dir in $(ls -1 "$JBOOTER_SAMPLES"); do
            if [ -f "$JBOOTER_SAMPLES/$dir-sample/.yo-rc.json" ]; then
                cleanProject "$dir-sample"
            else
                echo "$dir-sample: Not a JBOOTER project. Skipping"
            fi
        done
    fi
else
    usage
fi
