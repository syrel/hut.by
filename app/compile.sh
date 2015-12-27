#!/bin/bash

node r.js -o index.build.js;
node r.js -o index.build.css.js
node r.js -o admin.build.js;
node r.js -o admin.build.css.js


rm -rf build
mkdir -p build
cd build
mkdir -p css
mkdir -p js

mv ../scss/index.style.min.css css/
mv ../js/index.app.min.js js/

mv ../scss/admin.style.min.css css/
mv ../js/admin.app.min.js js/

cp ../js/config.js js/
cp -r ../assets/ ./
cp -rf ../img .
cd ../scss
ls . | grep -v '.css$' | xargs -J % -n1 cp -rf % ../build/css/
cd ..