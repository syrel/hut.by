#!/bin/bash
root="./"

js=$root"js/"
scss=$root"scss/"
assets=$root"assets/"
img=$root"img/"
build=$js"build/"

dist=$root"dist/"
distCss=$dist"css/"
distJs=$dist"js/"
distImg=$dist"img/"
r=$build"scripts/r.js"
modules=( "index.js" "index.css.js" "admin.js" "admin.css.js" )

function prepare {
	echo "Preparing..."
	rm -rf $dist
	mkdir -p $dist
	mkdir -p $distCss
	mkdir -p $distJs
}

function compile {
	echo "Compiling..."
	for module in "${modules[@]}"
		do
			node $r -o $build$module
		done
}

function release {
	echo "Releasing..."
	mv $scss"index.min.css" $distCss
	mv $js"index.min.js" $distJs
	
	mv $scss"admin.min.css" $distCss
	mv $js"admin.min.js" $distJs
	
	cp -r $assets $dist
	cp -rf $img $distImg
	
	source=$(echo $scss | sed 's/\//\\\//g')
	ls $scss | grep -v '.css$' | sed "s/^/$source/" | xargs -J % -n1 cp -rf % $distCss
	echo "Done!"
}

prepare
compile
release
