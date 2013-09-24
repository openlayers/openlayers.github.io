var fs = require('fs');
var path = require('path');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  grunt.registerMultiTask('move', 'Rename a directory', function(dest) {
    var done = this.async();

    var src = grunt.config.get([this.name, this.target, 'src']);
    var dest = grunt.config.get([this.name, this.target, 'dest']);

    if (!src || !fs.statSync(src).isDirectory()) {
      return done(
          new Error('The "src" config must be an existing directory.'));
    }
    if (!dest || fs.existsSync(dest)) {
      return done(
          new Error('The "dest" config must be a non-existent directory'));
    }
    grunt.file.mkdir(path.dirname(dest));

    fs.rename(src, dest, done);
  });

};
