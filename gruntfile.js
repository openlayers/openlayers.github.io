var path = require('path');


/**
 * The latest release.  Links to examples, doc, etc. will be prefixed by this
 * value.
 * @type {String}
 */
var latest = 'v' + require('./package.json').version;


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var treeish = grunt.option('treeish') || process.env.treeish || 'origin/master';
  if (treeish === 'latest') {
    treeish = latest;
  }

  var branch = treeish.split('/').pop(); // may not always be a local branch

  // file patterns (these take / on win and *nix)
  var build = '.grunt/openlayers-website';
  var dist = build + '/dist';
  var two = dist + '/two';
  var api = dist + '/api';
  var assets = dist + '/assets';
  var repo = build + '/repo';

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'git://github.com/openlayers/openlayers.git',
        treeish: treeish,
        dir: repo
      }
    },
    install: {
      options: {
        dir: repo
      }
    },
    run: {
      options: {cwd: repo},
      apidoc: {
        exec: 'npm run apidoc'
      },
      examples: {
        exec: 'npm run build-examples'
      },
      ol: {
        exec: 'npm run build'
      }
    },
    clean: {
      dist: dist,
      repo: repo,
      all: build
    },
    move: {
      apidoc: {
        src: repo + '/build/apidoc',
        dest: dist + '/en/' + branch + '/apidoc'
      },
      examples: {
        src: repo + '/build/examples',
        dest: dist + '/en/' + branch + '/examples'
      },
      ol: {
        src: [
          repo + '/build/ol.js*',
          repo + '/build/ol.js.map'
        ],
        dest: dist + '/en/' + branch + '/build/'
      },
      css: {
        src: [
          repo + '/build/ol.css*'
        ],
        dest: dist + '/en/' + branch + '/css/'
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
    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'src',
          src: 'theme/img/**/*.*',
          dest: assets
        }, {
          src: 'src/robots.txt',
          dest: dist + '/robots.txt'
        }, {
          expand: true,
          cwd: 'src/two',
          src: '**/*.*',
          dest: dist + '/two/'
        }, {
          expand: true,
          cwd: 'src/api',
          src: '**/*.*',
          dest: dist + '/api/'
        }, {
          expand: true,
          cwd: 'src/images',
          src: '**/*.*',
          dest: dist + '/images/'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: repo,
          src: [
            'doc/**/*.*',
            '!doc/**/*.hbs',
            '!doc/**/*.md',
          ],
          dest: dist + '/en/' + branch
        }]
      },
      latest: {
        files: [{
          expand: true,
          cwd: dist + '/en/' + branch,
          src: '**/*',
          dest: dist + '/en/latest'
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
      builder: {
        files: [{
          expand: true,
          cwd: 'src/builder',
          src: '**/index.hbs',
          dest: dist + '/builder'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: repo,
          src: ['doc/**/*.hbs', 'doc/**/*.md'],
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
    },
    zip: {
      full: {
        cwd: dist + '/en/',
        src: [
          dist + '/en/' + branch + '/**/*'
        ],
        dest: branch + '.zip',
        compression: 'DEFLATE'
      },
      dist: {
        src: [
          dist + '/en/' + branch + '/build/ol.js',
          dist + '/en/' + branch + '/css/ol.css',
        ],
        router: function(filepath) {
          return branch + '-dist/' + path.basename(filepath);
        },
        dest: branch + '-dist.zip',
        compression: 'DEFLATE'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-move');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('copyLatest', 'copy:latest');

  grunt.registerTask('maybeCopyLatest', function() {
    if (branch === latest) {
      grunt.task.run('copyLatest')
    }
  });

  grunt.registerTask('build', 'Build the website', [
    'checkout', 'install', 'run', 'clean:dist',
    'move', 'less', 'copy:all', 'copy:doc', 'assemble', 'maybeCopyLatest']);


  grunt.registerTask('deploy', 'Deploy the site', function() {
    grunt.task.run(['build', 'gh-pages']);
  });

  grunt.registerTask('start', 'Start the dev server',
      ['build', 'concurrent']);

  grunt.registerTask('serve', 'Start the dev server without build.py first',
      ['concurrent']);

  grunt.registerTask('archives', 'Create release archives',
      ['build', 'zip']);

  grunt.registerTask('default', 'build');

};
