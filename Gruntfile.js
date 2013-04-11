

/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  grunt.initConfig({
    checkout: {
      options: {
        repo: 'git://github.com/openlayers/ol3.git',
        dir: 'build/repo'
      }
    },
    jsdoc: {
      src: ['build/repo/src/*'],
      options: {
        configuration: 'build/repo/doc/conf.json',
        destination: 'build/doc'
      }
    },
    clean: {
      repo: 'build/repo',
      doc: 'build/doc',
      all: 'build'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['checkout:master', 'jsdoc']);

};

