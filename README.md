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

To build the site for a specific branch, you need to set a "treeish" environment variable.  This can be a tag (e.g. `v3.4.5-beta.1`) or a qualified branch name (e.g. `origin/foo`).

To build the site for a tag (or any commit really), set a "treeish" variable when running the `deploy` task.  E.g.

    $ treeish=v3.4.5-beta.1 npm run deploy

Note that if you want to deploy a branch on the `origin` remote, you should use `origin/<branch-name>` syntax to refer to it.  E.g.

    $ treeish=origin/master npm run deploy

This is the default "treeish" (deploying `origin/master`), so this is the same as running `npm run deploy` with no options.

## Serving the site during development

If you are making changes to the site templates or pages, you can run the `start` task.

    $ npm start

After building the site, this starts a file watcher that rebuilds pages/css on changes.  If you are targeting something besides `origin/master`, run the `start` tast with the "treeish" variable as described above.

    $ treeish=v3.2.1 npm start

## Updating the latest release

The latest release is specified in the `gruntfile.js` as `latest`.  Before deploying the site for a newly created tag, update the `gruntfile.js` with the name of the release tag.  Then run `treeish=v3.2.1 npm run deploy` as described above (with the name of the release tag).
