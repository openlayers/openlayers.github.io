# OpenLayers Website

## Building the site

Requires that you have [Git](http://git-scm.com/), [NodeJS](http://nodejs.org/),
and Grunt (`npm install -g grunt-cli`) installed.  Currently, building the website also requires all the ol3 [development dependencies](https://github.com/openlayers/ol3/wiki/Developer-Guide#development-dependencies) as well. The `JAVA_HOME` environment variable needs to be set and properly configured, pointing to the root of a Java JRE.

    $ git clone https://github.com/openlayers/openlayers.github.io.git
    $ cd openlayers.github.io
    $ npm install
    $ grunt

Currently this just builds API docs and examples for the master branch and puts
everything in `en`.  Next it will build API docs for multiple branches
as well as prose docs. Note: The `en` folder is auto-generated.

