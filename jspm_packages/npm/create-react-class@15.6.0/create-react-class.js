/* */ 
"format cjs";
(function(process) {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory(require('react'));
    else if (typeof define === 'function' && define.amd)
      define(["react"], factory);
    else if (typeof exports === 'object')
      exports["createReactClass"] = factory(require('react'));
    else
      root["createReactClass"] = factory(root["React"]);
  })(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
    return (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.i = function(value) {
        return value;
      };
      __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
          Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        }
      };
      __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
          return module['default'];
        } : function getModuleExports() {
          return module;
        };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 2);
    })([(function(module, exports, __webpack_require__) {
      "use strict";
      var _assign = __webpack_require__(7);
      var emptyObject = __webpack_require__(4);
      var _invariant = __webpack_require__(5);
      if (true) {
        var warning = __webpack_require__(6);
      }
      var MIXINS_KEY = 'mixins';
      function identity(fn) {
        return fn;
      }
      var ReactPropTypeLocationNames;
      if (true) {
        ReactPropTypeLocationNames = {
          prop: 'prop',
          context: 'context',
          childContext: 'child context'
        };
      } else {
        ReactPropTypeLocationNames = {};
      }
      function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
        var injectedMixins = [];
        var ReactClassInterface = {
          mixins: 'DEFINE_MANY',
          statics: 'DEFINE_MANY',
          propTypes: 'DEFINE_MANY',
          contextTypes: 'DEFINE_MANY',
          childContextTypes: 'DEFINE_MANY',
          getDefaultProps: 'DEFINE_MANY_MERGED',
          getInitialState: 'DEFINE_MANY_MERGED',
          getChildContext: 'DEFINE_MANY_MERGED',
          render: 'DEFINE_ONCE',
          componentWillMount: 'DEFINE_MANY',
          componentDidMount: 'DEFINE_MANY',
          componentWillReceiveProps: 'DEFINE_MANY',
          shouldComponentUpdate: 'DEFINE_ONCE',
          componentWillUpdate: 'DEFINE_MANY',
          componentDidUpdate: 'DEFINE_MANY',
          componentWillUnmount: 'DEFINE_MANY',
          updateComponent: 'OVERRIDE_BASE'
        };
        var RESERVED_SPEC_KEYS = {
          displayName: function(Constructor, displayName) {
            Constructor.displayName = displayName;
          },
          mixins: function(Constructor, mixins) {
            if (mixins) {
              for (var i = 0; i < mixins.length; i++) {
                mixSpecIntoComponent(Constructor, mixins[i]);
              }
            }
          },
          childContextTypes: function(Constructor, childContextTypes) {
            if (true) {
              validateTypeDef(Constructor, childContextTypes, 'childContext');
            }
            Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
          },
          contextTypes: function(Constructor, contextTypes) {
            if (true) {
              validateTypeDef(Constructor, contextTypes, 'context');
            }
            Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
          },
          getDefaultProps: function(Constructor, getDefaultProps) {
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
            } else {
              Constructor.getDefaultProps = getDefaultProps;
            }
          },
          propTypes: function(Constructor, propTypes) {
            if (true) {
              validateTypeDef(Constructor, propTypes, 'prop');
            }
            Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
          },
          statics: function(Constructor, statics) {
            mixStaticSpecIntoComponent(Constructor, statics);
          },
          autobind: function() {}
        };
        function validateTypeDef(Constructor, typeDef, location) {
          for (var propName in typeDef) {
            if (typeDef.hasOwnProperty(propName)) {
              if (true) {
                warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName);
              }
            }
          }
        }
        function validateMethodOverride(isAlreadyDefined, name) {
          var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
          if (ReactClassMixin.hasOwnProperty(name)) {
            _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
          }
          if (isAlreadyDefined) {
            _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
          }
        }
        function mixSpecIntoComponent(Constructor, spec) {
          if (!spec) {
            if (true) {
              var typeofSpec = typeof spec;
              var isMixinValid = typeofSpec === 'object' && spec !== null;
              if (true) {
                warning(isMixinValid, "%s: You're attempting to include a mixin that is either null " + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec);
              }
            }
            return;
          }
          _invariant(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
          _invariant(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');
          var proto = Constructor.prototype;
          var autoBindPairs = proto.__reactAutoBindPairs;
          if (spec.hasOwnProperty(MIXINS_KEY)) {
            RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
          }
          for (var name in spec) {
            if (!spec.hasOwnProperty(name)) {
              continue;
            }
            if (name === MIXINS_KEY) {
              continue;
            }
            var property = spec[name];
            var isAlreadyDefined = proto.hasOwnProperty(name);
            validateMethodOverride(isAlreadyDefined, name);
            if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
              RESERVED_SPEC_KEYS[name](Constructor, property);
            } else {
              var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
              var isFunction = typeof property === 'function';
              var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
              if (shouldAutoBind) {
                autoBindPairs.push(name, property);
                proto[name] = property;
              } else {
                if (isAlreadyDefined) {
                  var specPolicy = ReactClassInterface[name];
                  _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);
                  if (specPolicy === 'DEFINE_MANY_MERGED') {
                    proto[name] = createMergedResultFunction(proto[name], property);
                  } else if (specPolicy === 'DEFINE_MANY') {
                    proto[name] = createChainedFunction(proto[name], property);
                  }
                } else {
                  proto[name] = property;
                  if (true) {
                    if (typeof property === 'function' && spec.displayName) {
                      proto[name].displayName = spec.displayName + '_' + name;
                    }
                  }
                }
              }
            }
          }
        }
        function mixStaticSpecIntoComponent(Constructor, statics) {
          if (!statics) {
            return;
          }
          for (var name in statics) {
            var property = statics[name];
            if (!statics.hasOwnProperty(name)) {
              continue;
            }
            var isReserved = name in RESERVED_SPEC_KEYS;
            _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);
            var isInherited = name in Constructor;
            _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
            Constructor[name] = property;
          }
        }
        function mergeIntoWithNoDuplicateKeys(one, two) {
          _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');
          for (var key in two) {
            if (two.hasOwnProperty(key)) {
              _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
              one[key] = two[key];
            }
          }
          return one;
        }
        function createMergedResultFunction(one, two) {
          return function mergedResult() {
            var a = one.apply(this, arguments);
            var b = two.apply(this, arguments);
            if (a == null) {
              return b;
            } else if (b == null) {
              return a;
            }
            var c = {};
            mergeIntoWithNoDuplicateKeys(c, a);
            mergeIntoWithNoDuplicateKeys(c, b);
            return c;
          };
        }
        function createChainedFunction(one, two) {
          return function chainedFunction() {
            one.apply(this, arguments);
            two.apply(this, arguments);
          };
        }
        function bindAutoBindMethod(component, method) {
          var boundMethod = method.bind(component);
          if (true) {
            boundMethod.__reactBoundContext = component;
            boundMethod.__reactBoundMethod = method;
            boundMethod.__reactBoundArguments = null;
            var componentName = component.constructor.displayName;
            var _bind = boundMethod.bind;
            boundMethod.bind = function(newThis) {
              for (var _len = arguments.length,
                  args = Array(_len > 1 ? _len - 1 : 0),
                  _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              if (newThis !== component && newThis !== null) {
                if (true) {
                  warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName);
                }
              } else if (!args.length) {
                if (true) {
                  warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName);
                }
                return boundMethod;
              }
              var reboundMethod = _bind.apply(boundMethod, arguments);
              reboundMethod.__reactBoundContext = component;
              reboundMethod.__reactBoundMethod = method;
              reboundMethod.__reactBoundArguments = args;
              return reboundMethod;
            };
          }
          return boundMethod;
        }
        function bindAutoBindMethods(component) {
          var pairs = component.__reactAutoBindPairs;
          for (var i = 0; i < pairs.length; i += 2) {
            var autoBindKey = pairs[i];
            var method = pairs[i + 1];
            component[autoBindKey] = bindAutoBindMethod(component, method);
          }
        }
        var IsMountedPreMixin = {componentDidMount: function() {
            this.__isMounted = true;
          }};
        var IsMountedPostMixin = {componentWillUnmount: function() {
            this.__isMounted = false;
          }};
        var ReactClassMixin = {
          replaceState: function(newState, callback) {
            this.updater.enqueueReplaceState(this, newState, callback);
          },
          isMounted: function() {
            if (true) {
              warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', (this.constructor && this.constructor.displayName) || this.name || 'Component');
              this.__didWarnIsMounted = true;
            }
            return !!this.__isMounted;
          }
        };
        var ReactClassComponent = function() {};
        _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
        function createClass(spec) {
          var Constructor = identity(function(props, context, updater) {
            if (true) {
              warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory');
            }
            if (this.__reactAutoBindPairs.length) {
              bindAutoBindMethods(this);
            }
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
            this.state = null;
            var initialState = this.getInitialState ? this.getInitialState() : null;
            if (true) {
              if (initialState === undefined && this.getInitialState._isMockFunction) {
                initialState = null;
              }
            }
            _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');
            this.state = initialState;
          });
          Constructor.prototype = new ReactClassComponent();
          Constructor.prototype.constructor = Constructor;
          Constructor.prototype.__reactAutoBindPairs = [];
          injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
          mixSpecIntoComponent(Constructor, IsMountedPreMixin);
          mixSpecIntoComponent(Constructor, spec);
          mixSpecIntoComponent(Constructor, IsMountedPostMixin);
          if (Constructor.getDefaultProps) {
            Constructor.defaultProps = Constructor.getDefaultProps();
          }
          if (true) {
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps.isReactClassApproved = {};
            }
            if (Constructor.prototype.getInitialState) {
              Constructor.prototype.getInitialState.isReactClassApproved = {};
            }
          }
          _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');
          if (true) {
            warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component');
            warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component');
          }
          for (var methodName in ReactClassInterface) {
            if (!Constructor.prototype[methodName]) {
              Constructor.prototype[methodName] = null;
            }
          }
          return Constructor;
        }
        return createClass;
      }
      module.exports = factory;
    }), (function(module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      var React = __webpack_require__(1);
      var factory = __webpack_require__(0);
      if (typeof React === 'undefined') {
        throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
      }
      var ReactNoopUpdateQueue = new React.Component().updater;
      module.exports = factory(React.Component, React.isValidElement, ReactNoopUpdateQueue);
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      function makeEmptyFunction(arg) {
        return function() {
          return arg;
        };
      }
      var emptyFunction = function emptyFunction() {};
      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function() {
        return this;
      };
      emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
      };
      module.exports = emptyFunction;
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      var emptyObject = {};
      if (true) {
        Object.freeze(emptyObject);
      }
      module.exports = emptyObject;
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      var validateFormat = function validateFormat(format) {};
      if (true) {
        validateFormat = function validateFormat(format) {
          if (format === undefined) {
            throw new Error('invariant requires an error message argument');
          }
        };
      }
      function invariant(condition, format, a, b, c, d, e, f) {
        validateFormat(format);
        if (!condition) {
          var error;
          if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
          } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function() {
              return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
          }
          error.framesToPop = 1;
          throw error;
        }
      }
      module.exports = invariant;
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      var emptyFunction = __webpack_require__(3);
      var warning = emptyFunction;
      if (true) {
        (function() {
          var printWarning = function printWarning(format) {
            for (var _len = arguments.length,
                args = Array(_len > 1 ? _len - 1 : 0),
                _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function() {
              return args[argIndex++];
            });
            if (typeof console !== 'undefined') {
              console.error(message);
            }
            try {
              throw new Error(message);
            } catch (x) {}
          };
          warning = function warning(condition, format) {
            if (format === undefined) {
              throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
            }
            if (format.indexOf('Failed Composite propType: ') === 0) {
              return;
            }
            if (!condition) {
              for (var _len2 = arguments.length,
                  args = Array(_len2 > 2 ? _len2 - 2 : 0),
                  _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
              }
              printWarning.apply(undefined, [format].concat(args));
            }
          };
        })();
      }
      module.exports = warning;
    }), (function(module, exports, __webpack_require__) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === undefined) {
          throw new TypeError('Object.assign cannot be called with null or undefined');
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String('abc');
          test1[5] = 'de';
          if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join('') !== '0123456789') {
            return false;
          }
          var test3 = {};
          'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    })]);
  });
})(require('process'));
