

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
    clean: {
      repo: 'build/repo',
      doc: 'build/doc',
      en: 'en',
      all: ['build', 'en']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-rename');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['checkout:master', 'buildpy:host-examples',
      'buildpy:doc', 'clean:en', 'rename:main']);

};

