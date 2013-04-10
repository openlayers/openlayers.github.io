# OpenLayers Website

## Building the site

Requires that you have [Git](http://git-scm.com/), [NodeJS](http://nodejs.org/),
and Grunt (`npm install -g grunt-cli`) installed.

    $ git clone https://github.com/openlayers/openlayers.github.io.git
    $ cd openlayers.github.io
    $ npm install
    $ grunt

Currently this just builds API docs files for the master branch and puts
everything in `build/doc`.  Next it will build API docs for multiple branches
as well as prose docs.

