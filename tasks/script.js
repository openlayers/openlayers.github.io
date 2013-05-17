var fs = require('fs');
var path = require('path');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  /**
   * This task creates the script that is loaded by the index page to provide
   * navigation to various builds/releases.
   */
  grunt.registerTask('script', 'Generate the script', function() {
    var done = this.async();

    var options = this.options({});

    fs.readdir(options.builds, function(err, entries) {
      if (err) {
        return done(err);
      }
      var builds = entries.filter(function(entry) {
        return fs.statSync(path.join(options.builds, entry)).isDirectory();
      }).map(function(build) {
        return {name: build, selected: build === options.selected};
      });

      fs.readFile(options.src, function(err, data) {
        if (err) {
          return done(err);
        }
        var str = String(data).replace('{{ builds }}', JSON.stringify(builds));
        fs.writeFile(options.dest, str, done);
      });
    });
  });

};
