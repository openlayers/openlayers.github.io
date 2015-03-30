module.exports.register = function (Handlebars, options)  {

  var ol3model = { 'symbols': [], 'defines': [] };
  var duplicateBaseClasses = {};

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
              duplicateBaseClasses[namespace+'.'+obj] = true; // duplicate
            } else {
              ns[obj] = [];
              duplicateBaseClasses[namespace+'.'+obj] = false;
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

  var removeDuplicates = function(symbols) {
    var uniqueSymbols = symbols;
    for (var key in uniqueSymbols) {
      for (var baseClass in uniqueSymbols[key]) {
        for (var methodIndex in uniqueSymbols[key]['methods']) {
          if (baseClass === uniqueSymbols[key]['methods'][methodIndex]) {
            uniqueSymbols[key]['methods'].splice(methodIndex,1);
          }
        }
      }
    }
    return uniqueSymbols;
  };

  // Block Helper to categorize symbols and defines by namespace
  Handlebars.registerHelper("filterNamespace", function(arr, options) {
    if (arr && arr.length > 0) {
      var buffer = "", items = {};
      for (var i = 0; i < arr.length; i++) {
        savePropsAndMethods(arr[i].name);
      }
      // remove duplicates
      ol3model.symbols = removeDuplicates(ol3model.symbols);
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
