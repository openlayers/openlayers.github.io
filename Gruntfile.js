

/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'git://github.com/openlayers/ol3.git',
        dir: 'build/repo'
      }
    },
    buildpy: {
      options: {cwd: 'build/repo'}
    },
    move: {
      options: {
        src: 'build/repo/build/gh-pages/HEAD'
      }
    },
    rm: {
      options: {
        dir: './'
      }
    },
    publish: {
      options: {
        dir: './'
      }
    },
    clean: {
      repo: 'build/repo',
      doc: 'build/doc',
      all: 'build'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

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
    grunt.task.run([
      'checkout:' + treeish,
      'buildpy:host-examples',
      'buildpy:doc',
      'rm:en/' + branch,
      'move:en/' + branch,
      'publish:en/' + branch]);
  });

  grunt.registerTask('default', 'deploy:origin/master');

};

