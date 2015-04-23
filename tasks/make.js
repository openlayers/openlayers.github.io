var cp = require('child_process');


/**
 * This exports a "make" task that simply calls make with the supplied
 * arguments.  The `cwd` option may be used to specify the parent directory of
 * the Makefile.
 */


/** @param {Object} grunt Grunt DSL object. */
module.exports = function(grunt) {
  grunt.registerMultiTask('make', 'Run make.', function() {
    var args = this.data.args;
    var done = this.async();

    var options = this.options({
      cwd: process.cwd()
    });

    var mk = cp.spawn('make', args, {cwd: options.cwd});

    mk.stderr.on('data', function(chunk) {
      grunt.log.error(chunk.toString());
    });
    mk.stdout.on('data', function(chunk) {
      grunt.verbose.writeln(chunk.toString());
    });

    mk.on('exit', function(code) {
      if (code) {
        return done(new Error('make failure: ' + code));
      }
      done();
    });
  });
};
