/* */ 
'use strict';
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}
function getTracker(inst) {
  return inst._wrapperState.valueTracker;
}
function attachTracker(inst, tracker) {
  inst._wrapperState.valueTracker = tracker;
}
function detachTracker(inst) {
  delete inst._wrapperState.valueTracker;
}
function getValueFromNode(node) {
  var value;
  if (node) {
    value = isCheckable(node) ? '' + node.checked : node.value;
  }
  return value;
}
var inputValueTracking = {
  _getTrackerFromNode: function(node) {
    return getTracker(ReactDOMComponentTree.getInstanceFromNode(node));
  },
  track: function(inst) {
    if (getTracker(inst)) {
      return;
    }
    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
    var valueField = isCheckable(node) ? 'checked' : 'value';
    var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
    var currentValue = '' + node[valueField];
    if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
      return;
    }
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable,
      configurable: true,
      get: function() {
        return descriptor.get.call(this);
      },
      set: function(value) {
        currentValue = '' + value;
        descriptor.set.call(this, value);
      }
    });
    attachTracker(inst, {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = '' + value;
      },
      stopTracking: function() {
        detachTracker(inst);
        delete node[valueField];
      }
    });
  },
  updateValueIfChanged: function(inst) {
    if (!inst) {
      return false;
    }
    var tracker = getTracker(inst);
    if (!tracker) {
      inputValueTracking.track(inst);
      return true;
    }
    var lastValue = tracker.getValue();
    var nextValue = getValueFromNode(ReactDOMComponentTree.getNodeFromInstance(inst));
    if (nextValue !== lastValue) {
      tracker.setValue(nextValue);
      return true;
    }
    return false;
  },
  stopTracking: function(inst) {
    var tracker = getTracker(inst);
    if (tracker) {
      tracker.stopTracking();
    }
  }
};
module.exports = inputValueTracking;
