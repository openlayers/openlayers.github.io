var cp = require('child_process');


/**
 * This exports a "buildpy" task that simply calls build.py with the supplied
 * arguments.  The `cwd` option may be used to specify the parent directory of
 * the build.py script.
 */


/** @param {Object} grunt Grunt DSL object. */
module.exports = function(grunt) {
  grunt.registerMultiTask('buildpy', 'Run build.py.', function() {
    var args = this.data.args;
    var done = this.async();

    var options = this.options({
      cwd: process.cwd()
    });

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
