#!/bin/bash

node r.js -o build.js;
node r.js -o build.css.js

rm -rf build
mkdir -p build
cd build
mkdir -p css
mkdir -p js

mv ../scss/style.min.css css/
mv ../js/app.min.js js/
cp ../assets/* .
cp -rf ../img .
cd ../scss
ls . | grep -v '.css$' | xargs -J % -n1 cp -rf % ../build/css/
cd ..