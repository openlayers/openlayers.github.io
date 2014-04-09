var spawn = require('child_process').spawn;


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {
  grunt.registerTask('install', 'Run `npm install` in a dir.', function() {

    var done = this.async();

    var options = this.options();

    if (!options.dir) {
      return done(new Error('Missing "dir" argument to install.'));
    }

    var child = spawn('npm', ['install'], {cwd: options.dir});

    var errors = '';
    child.stderr.on('data', function(data) {
      errors += String(data);
    });

    child.stdout.on('data', function(data) {
      grunt.verbose.writeln(String(data));
    });

    child.on('exit', function(code) {
      if (code) {
        done(new Error(errors || 'npm install failed with no output'));
      } else {
        done();
      }
    });
  });
};
