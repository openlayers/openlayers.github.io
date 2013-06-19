# OpenLayers Website

## Building the site

Requires that you have [Git](http://git-scm.com/), [NodeJS](http://nodejs.org/), and Grunt (`npm install -g grunt-cli`) installed.  Currently, building the website also requires all the ol3 [development dependencies](https://github.com/openlayers/ol3/wiki/Developer-Guide#development-dependencies) as well.

    $ git clone -b build https://github.com/openlayers/openlayers.github.io.git
    $ cd openlayers.github.io
    $ npm install
    $ grunt

Note that the `build` branch of this repository is the default branch.  The build tasks and resources are in this branch.  The `master` branch contains the build artifacts, and this is what is deployed at http://ol3js.org/.  The build tasks modify the contents of the `master` branch and push changes.

The default task builds API docs and examples for the master branch and puts everything in `en/master`.

To build the site for a tag (or any commit really), provide a tree-ish argument to the `deploy` task.  E.g.

    $ grunt deploy:r3.4.5-beta.1

Note that if you want to deploy a branch on the `origin` remote, you should use `origin/<branch-name>` syntax to refer to it.  E.g.

    $ grunt deploy:origin/master

This is the default task (deploying `origin/master`), so this is the same as running `grunt` with no args.
