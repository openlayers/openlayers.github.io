# OpenLayers Website Build Utilities

## Updating the site with changes from master

Requires that you have [Git](http://git-scm.com/) and [NodeJS](http://nodejs.org/) installed.  Currently, building the website also requires all the ol3 [development dependencies](https://github.com/openlayers/ol3/wiki/Developer-Guide#development-dependencies) as well.

    $ git clone -b build https://github.com/openlayers/openlayers.github.io.git
    $ cd openlayers.github.io
    $ npm install
    $ npm run deploy

Future updates only require that you run `npm run deploy`.  This will update the site documentation and examples from the `master` branch of the `ol3` repository.  To deploy the site for other branches/tags, see below.

Note that the `build` branch of this repository is the default branch.  The build tasks and resources are in this branch.  The `master` branch of this repository contains the build artifacts, and this is what is deployed at http://ol3js.org/.  The build tasks modify the contents of the `master` branch and push changes.

## Building the site for an arbitrary tag or branch

To build the site for a specific branch, you need to have Grunt installed (`npm install -g grunt-cli`).

The `grunt deploy` task takes the name of a "treeish" as an option.  This can be a tag (e.g. `r3.4.5-beta.1`) or a qualified branch name (e.g. `origin/foo`).

To build the site for a tag (or any commit really), provide a treeish option to the `deploy` task.  E.g.

    $ grunt deploy --treeish r3.4.5-beta.1

Note that if you want to deploy a branch on the `origin` remote, you should use `origin/<branch-name>` syntax to refer to it.  E.g.

    $ grunt deploy --treeish origin/master

This is the default task (deploying `origin/master`), so this is the same as running `grunt` with no options.

## Serving the site during development

If you are making changes to the site templates or pages, you can run the `start` task.

    $ npm start

After building the site, this starts a file watcher that rebuilds pages/css on changes.  If you are targeting something besides `origin/master`, run the `grunt start` tast with the `treeish` option as described above.

    $ grunt start --treeish r3.2.1

## Updating the current release

The latest release is specified in the `gruntfile.js` as `current` (this will not always be the case).  Before deploying the site for a newly created tag, update the `gruntfile.js` with the name of the release tag.  Then run `grunt deploy --treeish r3.2.1` as described above (with the name of the release tag).
