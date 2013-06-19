var cp = require('child_process');
var fs = require('fs');

var Q = require('q');

// util function for handling spawned processes as promises
function spawn(exe, args, cwd) {
  var deferred = Q.defer();
  var child = cp.spawn(exe, args, {cwd: cwd || process.cwd()});
  var buffer = [];
  child.stderr.on('data', function(chunk) {
    buffer.push(chunk.toString());
  });
  child.stdout.on('data', function(chunk) {
    deferred.notify(chunk.toString());
  });
  child.on('exit', function(code) {
    if (code) {
      var msg = buffer.join('') || 'Process failed: ' + code;
      deferred.reject(new Error(msg));
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

// clone a repo into the given dir if it doesn't already exist
function clone(git, repo, dir) {
  if (fs.existsSync(dir)) {
    return Q.resolve();
  }
  return spawn(git, ['clone', repo, dir]);
}

// fetch from a remote
function fetch(git, remote, dir) {
  return spawn(git, ['fetch', remote], dir);
}

// fetch tags from a remote
function fetchTags(git, remote, dir) {
  return spawn(git, ['fetch', '--tags', remote], dir);
}

// check out a tree-ish (e.g. origin/master or r3.1.0-beta.4)
// this requires that fetch and fetchTags have been called first
function checkout(git, treeish, dir) {
  return spawn(git, ['checkout', treeish, '-f'], dir);
}

// clean up unversioned files
function clean(git, dir) {
  return spawn(git, ['clean', '-f', '-d'], dir);
}


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {
  grunt.registerTask('checkout', 'Check out with git.', function(treeish) {
    var done = this.async();

    var options = this.options({git: 'git'});

    if (!treeish) {
      return done(new Error('Missing "treeish" argument to checkout.'));
    }
    if (!options.repo) {
      return done(new Error('Missing "repo" property in checkout options.'));
    }
    if (!options.dir) {
      return done(new Error('Missing "dir" property in checkout options.'));
    }

    var remote = 'origin';
    grunt.log.writeln('Cloning ' + options.repo + ' into ' + options.dir);
    clone(options.git, options.repo, options.dir).
        then(function() {
          grunt.log.writeln('Fetching from ' + remote);
          return fetch(options.git, remote, options.dir);
        }).
        then(function() {
          grunt.log.writeln('Fetching tags from ' + remote);
          return fetchTags(options.git, remote, options.dir);
        }).
        then(function() {
          // only required if someone mucks with the checkout between builds
          grunt.log.writeln('Cleaning');
          return clean(options.git, options.dir);
        }).
        then(function() {
          grunt.log.writeln('Checking out ' + treeish);
          return checkout(options.git, treeish, options.dir);
        }).
        then(function() {
          done();
        }, function(error) {
          done(error);
        }, function(progress) {
          grunt.verbose.writeln(progress);
        });

  });

};
