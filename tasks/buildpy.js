var cp = require('child_process');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {
  grunt.registerTask('buildpy', 'Run build.py.', function() {
    var args = Array.prototype.slice.call(arguments);
    var done = this.async();

    var options = this.options({});
    if (!options.cwd) {
      return done(new Error('Missing "cwd" property in buildpy options.'));
    }

    var py = cp.spawn('python', ['build.py'].concat(args), {cwd: options.cwd});

    py.stderr.on('data', function(chunk) {
      grunt.log.error(chunk.toString());
    });
    py.stdout.on('data', function(chunk) {
      grunt.verbose.writeln(chunk.toString());
    });

    py.on('exit', function(code) {
      if (code) {
        return done(new Error('build.py failure: ' + code));
      }
      done();
    });
  });
};
