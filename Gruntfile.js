var path = require('path');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var build = path.join('.grunt', 'openlayers-website');
  var dist = path.join(build, 'dist');
  var repo = path.join(build, 'repo');

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'git://github.com/openlayers/ol3.git',
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
    },
    // new stuff
    less: {
      all: {
        options: {
          compress: true
        },
        files: [{
          src: 'src/theme/site.less',
          dest: path.join(build, 'theme', 'site.css')
        }]
      }
    },
    copy: {
      all: {
        files: [{
          expand: true,
          src: 'theme/img/**/*',
          dest: build
        }, {
          // TODO: uglify all js together
          expand: true,
          src: 'bower_components/jquery/jquery.min.js'
          dest: build
        }, {
          // TODO: uglify all js together
          expand: true,
          src: 'bower_components/bootstrap/dist/js/bootstrap.min.js'
          dest: build
        }]
      }
    },
    assemble: {
      options: {
        layoutdir: 'src/layouts'
      },
      pages: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: '**/*',
          dest: path.join(build)
        }]
      }
    },
    watch: {
      less: {
        files: 'src/theme/**/*.less',
        tasks: ['less']
      },
      pages: {
        files: 'src/pages/**/*',
        tasks: ['assemble:pages']
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
      'buildpy:doc',
      'clean:dist',
      'move:' + path.join(dist, 'en', branch),
      'gh-pages'
    ]);
  });

  grunt.registerTask('build', 'Build the website',
      ['less', 'copy', 'assemble']);

  // grunt.registerTask('default', 'deploy:origin/master');
  grunt.registerTask('default', 'build');

};
