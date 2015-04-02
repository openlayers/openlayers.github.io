var util = require('util');
module.exports.register = function (Handlebars, options)  {
  function createPath(obj, path) {
    var arr = path.split('.');
    return arr.reduce(function(o, key) {
      if (!o[key]) {
        o[key] = {};
      }
      return o[key];
    }, obj);
  }

  function toNested(symbols) {
    var res = {};

    symbols.forEach(function(item, i) {
      var name = item.name;
      var method = name.split('#');
      var path = method[0].split('.').splice(1);

      //TODO: match first sentence to '. ' '.\n' etc
      item.blurb = item.description ? 
        item.description.match(/^(.|\s)*?([\.!\?](?:\s|$)|$)/gi) : '';

      if (item.kind && item.kind.length > 0) {
        item['is' + item.kind] = true;
      }
      // Create path to object.
      var obj = path.reduce(function(obj, key, i) {
        // All children are stored in __nodes.children
        createPath(obj, '__nodes.children');
        if (!obj.__nodes.children[key]) {
            obj.__nodes.children[key] = {};
        }

        return obj.__nodes.children[key];
      }, res);

      if (method[1]) {
        // All of an objects methods are stored in __nodes.methods
        createPath(obj, '__nodes.methods');
        var methods = obj.__nodes.methods;
        methods[method[1]] = { id: i, props: item };
      } else {
        obj.props = item; // make item properties accessible to template
        obj.id = i; // save index
      }
    });

    return res.__nodes.children;
  }

  // Block Helper to categorize symbols and defines by namespace
  Handlebars.registerHelper("filterNamespace", function(arr, options) {
    if (arr && arr.length > 0) {
      return options.fn(toNested(arr));
    }
    else {
      return options.elseFn();
    }
  });

};
