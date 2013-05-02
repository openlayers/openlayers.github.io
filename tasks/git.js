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

// create a broken promise
function fail(reason) {
  var deferred = Q.defer();
  deferred.reject(new Error(reason));
  return deferred.promise;
}

// create a fulfilled promise
function pass() {
  var deferred = Q.defer();
  deferred.resolve();
  return deferred.promise;
}

// clone a repo into the given dir if it doesn't already exist
function clone(git, repo, dir) {
  if (fs.existsSync(dir)) {
    return pass();
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

// pull from a remote
function pull(git, remote, branch, dir) {
  return spawn(git, ['pull', remote, branch], dir);
}

// reset to match remote/branch
function reset(git, branch, dir) {
  return spawn(git, ['reset', '--hard', branch], dir);
}

// clean up unversioned files
function clean(git, dir) {
  return spawn(git, ['clean', '-f', '-d'], dir);
}

// rebase-pull a branch
function rebase(git, remote, dir) {
  return spawn(git, ['pull', '--rebase', remote], dir);
}

// add files
function add(git, files, dir) {
  return spawn(git, ['add', files], dir);
}

// remove files
function rm(git, files, dir) {
  return spawn(git, ['rm', '--ignore-unmatch', '-r', '-f', files], dir);
}

// commit
function commit(git, message, dir) {
  return spawn(git, ['commit', '-m', message], dir);
}

// push a branch
function push(git, remote, dir) {
  return spawn(git, ['push', remote], dir);
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

  grunt.registerTask('publish', 'Publish with git.', function(files) {
    var done = this.async();

    var options = this.options({
      git: 'git',
      branch: 'master',
      message: 'Updating ' + files + '\n\n' +
          'This is an auto-generated commit.'
    });

    if (!options.dir) {
      return done(new Error('Missing "dir" property in publish options.'));
    }

    var remote = 'origin';
    grunt.log.writeln('Adding ' + files);
    add(options.git, files, options.dir).
        then(function() {
          grunt.log.writeln('Checking for changes in ' + files);
          return spawn(options.git, ['diff-index', '--quiet', 'HEAD', files],
              options.dir);
        }).
        then(function() {
          grunt.log.writeln('Nothing changed in ' + files +
              ' since last commit.');
          done();
        }, function() {
          grunt.log.writeln('Committing');
          commit(options.git, options.message, options.dir).
              then(function() {
                grunt.log.writeln('Rebasing from ' + remote);
                return rebase(options.git, remote, options.dir);
              }).
              then(function() {
                grunt.log.writeln('Pushing to ' + remote);
                return push(options.git, remote, options.dir);
              }).
              then(function() {
                done();
              }, function(error) {
                done(error);
              }, function(progress) {
                grunt.verbose.writeln(progress);
              });
        }, function(progress) {
          grunt.verbose.writeln(progress);
        });

  });

  grunt.registerTask('rm', 'Remove files with git.', function(files) {
    var done = this.async();

    var options = this.options({
      git: 'git',
      branch: 'master'
    });

    if (!options.dir) {
      return done(new Error('Missing "dir" property in publish options.'));
    }

    grunt.log.writeln('Removing ' + files);
    rm(options.git, files, options.dir).
        then(function() {
          done();
        }, function(error) {
          done(error);
        }, function(progress) {
          grunt.verbose.writeln(progress);
        });

  });

};
