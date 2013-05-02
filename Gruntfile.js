

/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var currentRelease = 'r3.0.0-alpha.1';

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
    rename: {
      master: {
        files: [
          {src: ['build/repo/build/gh-pages/master'], dest: 'en/master'}
        ]
      },
      release: {
        files: [{
          src: ['build/repo/build/gh-pages/HEAD'],
          dest: 'en/' + currentRelease
        }]
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
  grunt.loadNpmTasks('grunt-contrib-rename');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'checkout:master', 'buildpy:host-examples',
    'buildpy:doc', 'rm:en/master', 'rename:master', 'publish:en/master']);

  grunt.registerTask('release', [
    'checkout:' + currentRelease,
    'buildpy:host-examples', 'buildpy:doc',
    'rm:en/' + currentRelease,
    'rename:release', 'publish:en/' + currentRelease]);

};

