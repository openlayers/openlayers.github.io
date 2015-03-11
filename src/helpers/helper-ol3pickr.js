module.exports.register = function (Handlebars, options)  {

   var ol3model = { 'symbols': [], 'defines': [] };

  var savePropsAndMethods = function(str) {
    var length = str.length, foundFirst = false, namespace, method, obj = null;

    for (var i=0; i<length; i++) {
      if (str[i] == '.') {
        if (!foundFirst) { // found 1st .
          foundFirst = true;
        } else {
          namespace = str.slice(0, i);
          method = str.slice(i+1);
          var hash = method.indexOf('#');
          if (hash > -1) {
            obj = method.slice(0, hash);
            method = method.slice(hash+1);
          }

          var ns = ol3model.symbols[namespace];
          if (!ns) {
            ol3model.symbols[namespace] = {};
            ns = ol3model.symbols[namespace];
          }
          if (obj) {
            if (obj in ns) {
              ns[obj].push(method);
            } else {
              ns[obj] = [];
            }
          } else {
            if (!ns['methods']) {
              ol3model.symbols[namespace]['methods'] = [];
            }
            ns['methods'].push(method);
          }
          return;
        }
      }
    }
    return;
  };

  // Block Helper to categorize symbols and defines by namespace
  Handlebars.registerHelper("filterNamespace", function(arr, options) {
    if (arr && arr.length > 0) {
      var buffer = "", items = {};
      for (var i = 0; i < arr.length; i++) {
        savePropsAndMethods(arr[i].name);
      }
      // process the inside of the block
      buffer += options.fn(ol3model.symbols);
      // return the finished buffer
      return buffer;
    }
    else {
      return options.elseFn();
    }
  });

};
