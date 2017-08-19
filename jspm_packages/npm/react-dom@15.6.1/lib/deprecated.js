/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var lowPriorityWarning = require('./lowPriorityWarning');
  function deprecated(fnName, newModule, newPackage, ctx, fn) {
    var warned = false;
    if (process.env.NODE_ENV !== 'production') {
      var newFn = function() {
        lowPriorityWarning(warned, 'React.%s is deprecated. Please use %s.%s from require' + "('%s') " + 'instead.', fnName, newModule, fnName, newPackage);
        warned = true;
        return fn.apply(ctx, arguments);
      };
      _assign(newFn, fn);
      return newFn;
    }
    return fn;
  }
  module.exports = deprecated;
})(require('process'));
