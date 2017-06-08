#!/bin/bash
set -e

#-------------------------------------------------------------------------------
# Force no insight
#-------------------------------------------------------------------------------
if [ "$APP_FOLDER" == "$HOME/app" ]; then
    mkdir -p "$HOME"/.config/configstore/
    cp "$JBOOTER_TRAVIS"/configstore/*.json "$HOME"/.config/configstore/
fi

#-------------------------------------------------------------------------------
# Generate the project with jbooter
#-------------------------------------------------------------------------------
if [ "$JBOOTER" == "app-ng2-gateway-uaa" ]; then
    mkdir -p "$UAA_APP_FOLDER"
    cp -f "$JBOOTER_SAMPLES"/uaa/.yo-rc.json "$UAA_APP_FOLDER"/
    cd "$UAA_APP_FOLDER"
    yarn link generator-jbooter
    jbooter --force --no-insight --with-entities --skip-checks
    ls -al "$UAA_APP_FOLDER"
fi

mkdir -p "$APP_FOLDER"
cp -f "$JBOOTER_SAMPLES"/"$JBOOTER"/.yo-rc.json "$APP_FOLDER"/
cd "$APP_FOLDER"
yarn link generator-jbooter
jbooter --force --no-insight --skip-checks --with-entities
ls -al "$APP_FOLDER"
