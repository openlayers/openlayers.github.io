

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
    rename: {
      main: {
        files: [
            {src: ['build/repo/build/gh-pages'], dest: 'en'}
        ]
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

  grunt.registerTask('default', ['checkout:r3.0.0-alpha.1', 'buildpy:host-examples',
      'buildpy:doc', 'rm:en', 'rename:main', 'publish:en']);

};

