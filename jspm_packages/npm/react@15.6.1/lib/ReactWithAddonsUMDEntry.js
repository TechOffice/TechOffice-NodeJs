/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var ReactWithAddons = require('./ReactWithAddons');
  var ReactWithAddonsUMDEntry = _assign(ReactWithAddons, {
    __SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: null,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {ReactCurrentOwner: require('./ReactCurrentOwner')}
  });
  if (process.env.NODE_ENV !== 'production') {
    _assign(ReactWithAddonsUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
      ReactComponentTreeHook: require('./ReactComponentTreeHook'),
      getNextDebugID: require('./getNextDebugID')
    });
  }
  module.exports = ReactWithAddonsUMDEntry;
})(require('process'));
