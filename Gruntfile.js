var path = require('path');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var build = path.join('.grunt', 'openlayers-website');
  var dist = path.join(build, 'dist');
  var repo = path.join(build, 'repo');

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'https://github.com/openlayers/ol3.git',
        dir: repo
      }
    },
    buildpy: {
      options: {cwd: repo}
    },
    move: {
      options: {
        src: path.join(repo, 'build', 'hosted', 'HEAD')
      }
    },
    'gh-pages': {
      options: {
        branch: 'master',
        base: dist
      },
      src: ['**/*']
    },
    clean: {
      dist: dist,
      repo: repo,
      all: build
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.loadTasks('tasks');

  /**
   * The deploy task will build the site resources for a particular git
   * tree-ish.  A fetch of all heads and tags will be run first, so you
   * typically specify something like origin/master or r3.4.5-beta.1 for the
   * treeish.  This *doesn't* do any merging before building, so you don't want
   * to simply specify the name of a local branch (whose head may not be the
   * same as a tracked branch for some remote).
   */
  grunt.registerTask('deploy', 'Build a tree-ish', function(treeish) {
    var branch = treeish.split('/').pop(); // may not always be a local branch

    // configure gh-pages task to only remove en/<branch> before adding all
    grunt.option('grunt-gh-pages-only', path.join('en', branch));

    grunt.task.run([
      'checkout:' + treeish,
      'buildpy:host-examples',
      'buildpy:apidoc',
      'clean:dist',
      'move:' + path.join(dist, 'en', branch),
      'gh-pages'
    ]);
  });

  grunt.registerTask('default', 'deploy:origin/master');

};
