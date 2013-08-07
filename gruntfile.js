var path = require('path');


/**
 * Branch/tag name for the current release (e.g. 'master' or 'r3.2.1').
 * @type {string}
 */
var current = 'master';


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var build = path.join('.grunt', 'openlayers-website');
  var dist = path.join(build, 'dist');
  var assets = path.join(dist, 'assets');
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
    },
    // new stuff
    less: {
      all: {
        options: {
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: 'theme/**/*.less',
          dest: assets,
          ext: '.css'
        }]
      }
    },
    uglify: {
      all: {
        files: [{
          src: [
            'bower_components/jquery/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
          ],
          dest: path.join(assets, 'js/main.js')
        }]
      }
    },
    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'src',
          src: 'theme/img/**/*',
          dest: assets
        }, {
          expand: true,
          cwd: 'bower_components/font-awesome',
          src: 'font/**/*',
          dest: assets
        }]
      }
    },
    assemble: {
      options: {
        layoutdir: 'src/layouts',
        assets: assets,
        current: current
      },
      pages: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: '**/*',
          dest: dist
        }]
      }
    },
    connect: {
      options: {
        base: dist,
        keepalive: true
      },
      server: {}
    },
    watch: {
      layouts: {
        files: 'src/layouts/**/*',
        tasks: ['assemble:pages']
      },
      pages: {
        files: 'src/pages/**/*',
        tasks: ['assemble:pages']
      },
      theme: {
        files: 'src/theme/**/*.less',
        tasks: ['less']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      target: {
        tasks: ['connect', 'watch']
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-openlayers');

  grunt.loadTasks('tasks');

  /**
   * The deploy task will build the site resources for a particular git
   * tree-ish.  A fetch of all heads and tags will be run first, so you
   * typically specify something like origin/master or r3.4.5-beta.1 for the
   * treeish.  This *doesn't* do any merging before building, so you don't want
   * to simply specify the name of a local branch (whose head may not be the
   * same as a tracked branch for some remote).
   */
  grunt.registerTask('docetc', 'Build docs for a tree-ish', function() {
    var treeish = grunt.option('treeish');
    if (!treeish) {
      grunt.fatal(new Error('Missing "treeish" option.'));
    }

    var branch = treeish.split('/').pop(); // may not always be a local branch

    grunt.task.run([
      'checkout:' + treeish,
      'buildpy:host-examples',
      'buildpy:apidoc',
      'clean:dist',
      'move:' + path.join(dist, 'en', branch)
    ]);
  });

  grunt.registerTask('build', 'Build the website',
      ['docetc', 'less', 'uglify', 'copy', 'assemble']);


  grunt.registerTask('deploy', 'Deploy the site', function() {
    var treeish = grunt.option('treeish');
    if (!treeish) {
      grunt.fatal(new Error('Missing "treeish" option.'));
    }
    var branch = treeish.split('/').pop(); // may not always be a local branch

    grunt.option('grunt-gh-pages-only', path.join('en', branch));
    grunt.task.run(['build', 'gh-pages']);
  });


  grunt.registerTask('start', 'Start the dev server',
      ['build', 'concurrent']);

  // grunt.registerTask('default', 'deploy:origin/master');
  grunt.registerTask('default', 'build');

};
