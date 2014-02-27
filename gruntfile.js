var path = require('path');


/**
 * The latest release.  Links to examples, doc, etc. will be prefixed by this
 * value.  Examples: v3.0.0-beta.1 or master.
 * @type {String}
 */
var latest = 'master';


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var treeish = grunt.option('treeish') ||
      process.env.treeish || 'origin/master';

  var branch = treeish.split('/').pop(); // may not always be a local branch

  // file patterns (these take / on win and *nix)
  var build = '.grunt/openlayers-website';
  var dist = build + '/dist';
  var assets = dist + '/assets';
  var repo = build + '/repo';

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'git://github.com/openlayers/ol3.git',
        treeish: treeish,
        dir: repo
      }
    },
    buildpy: {
      options: {cwd: repo},
      apidoc: {
        args: ['apidoc']
      },
      examples: {
        args: ['host-examples']
      }
    },
    clean: {
      dist: dist,
      repo: repo,
      all: build
    },
    move: {
      apidoc: {
        src: repo + '/build/hosted/HEAD/apidoc',
        dest: dist + '/en/' + branch + '/apidoc'
      },
      build: {
        src: repo + '/build/hosted/HEAD/build',
        dest: dist + '/en/' + branch + '/build'
      },
      closure: {
        src: repo + '/build/hosted/HEAD/closure-library',
        dest: dist + '/en/' + branch + '/closure-library'
      },
      ol: {
        src: repo + '/build/hosted/HEAD/ol',
        dest: dist + '/en/' + branch + '/ol'
      },
      examples: {
        src: repo + '/build/hosted/HEAD/examples',
        dest: dist + '/en/' + branch + '/examples'
      },
      css: {
        src: repo + '/build/hosted/HEAD/css',
        dest: dist + '/en/' + branch + '/css'
      },
      resources: {
        src: repo + '/build/hosted/HEAD/resources',
        dest: dist + '/en/' + branch + '/resources'
      }
    },
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
          dest: assets + '/js/main.js'
        }]
      }
    },
    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'src',
          src: 'theme/img/**/*.*',
          dest: assets
        }, {
          expand: true,
          cwd: 'bower_components/font-awesome',
          src: 'font/**/*.*',
          dest: assets
        }]
      }
    },
    assemble: {
      options: {
        layoutdir: 'src/layouts',
        assets: assets,
        latest: latest
      },
      pages: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: '**/*.*',
          dest: dist
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: repo,
          src: 'doc/**/*.*',
          dest: dist + '/en/' + branch
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
        tasks: ['assemble']
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
    },
    'gh-pages': {
      options: {
        branch: 'master',
        base: dist,
        only: 'en/' + branch
      },
      src: ['**/*']
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.loadTasks('tasks');

  grunt.registerTask('build', 'Build the website', [
    'checkout', 'buildpy:examples', 'buildpy:apidoc', 'clean:dist',
    'move', 'less', 'uglify', 'copy', 'assemble']);


  grunt.registerTask('deploy', 'Deploy the site', function() {
    grunt.task.run(['build', 'gh-pages']);
  });

  grunt.registerTask('start', 'Start the dev server',
      ['build', 'concurrent']);

  grunt.registerTask('serve', 'Start the dev server without build.py first',
      ['concurrent']);

  grunt.registerTask('default', 'build');

};
