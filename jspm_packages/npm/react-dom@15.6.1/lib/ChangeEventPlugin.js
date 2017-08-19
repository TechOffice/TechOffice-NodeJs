/* */ 
(function(process) {
  'use strict';
  var EventPluginHub = require('./EventPluginHub');
  var EventPropagators = require('./EventPropagators');
  var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactUpdates = require('./ReactUpdates');
  var SyntheticEvent = require('./SyntheticEvent');
  var inputValueTracking = require('./inputValueTracking');
  var getEventTarget = require('./getEventTarget');
  var isEventSupported = require('./isEventSupported');
  var isTextInputElement = require('./isTextInputElement');
  var eventTypes = {change: {
      phasedRegistrationNames: {
        bubbled: 'onChange',
        captured: 'onChangeCapture'
      },
      dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
    }};
  function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
    var event = SyntheticEvent.getPooled(eventTypes.change, inst, nativeEvent, target);
    event.type = 'change';
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  var activeElement = null;
  var activeElementInst = null;
  function shouldUseChangeEvent(elem) {
    var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
  }
  var doesChangeEventBubble = false;
  if (ExecutionEnvironment.canUseDOM) {
    doesChangeEventBubble = isEventSupported('change') && (!document.documentMode || document.documentMode > 8);
  }
  function manualDispatchChangeEvent(nativeEvent) {
    var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));
    ReactUpdates.batchedUpdates(runEventInBatch, event);
  }
  function runEventInBatch(event) {
    EventPluginHub.enqueueEvents(event);
    EventPluginHub.processEventQueue(false);
  }
  function startWatchingForChangeEventIE8(target, targetInst) {
    activeElement = target;
    activeElementInst = targetInst;
    activeElement.attachEvent('onchange', manualDispatchChangeEvent);
  }
  function stopWatchingForChangeEventIE8() {
    if (!activeElement) {
      return;
    }
    activeElement.detachEvent('onchange', manualDispatchChangeEvent);
    activeElement = null;
    activeElementInst = null;
  }
  function getInstIfValueChanged(targetInst, nativeEvent) {
    var updated = inputValueTracking.updateValueIfChanged(targetInst);
    var simulated = nativeEvent.simulated === true && ChangeEventPlugin._allowSimulatedPassThrough;
    if (updated || simulated) {
      return targetInst;
    }
  }
  function getTargetInstForChangeEvent(topLevelType, targetInst) {
    if (topLevelType === 'topChange') {
      return targetInst;
    }
  }
  function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
    if (topLevelType === 'topFocus') {
      stopWatchingForChangeEventIE8();
      startWatchingForChangeEventIE8(target, targetInst);
    } else if (topLevelType === 'topBlur') {
      stopWatchingForChangeEventIE8();
    }
  }
  var isInputEventSupported = false;
  if (ExecutionEnvironment.canUseDOM) {
    isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
  }
  function startWatchingForValueChange(target, targetInst) {
    activeElement = target;
    activeElementInst = targetInst;
    activeElement.attachEvent('onpropertychange', handlePropertyChange);
  }
  function stopWatchingForValueChange() {
    if (!activeElement) {
      return;
    }
    activeElement.detachEvent('onpropertychange', handlePropertyChange);
    activeElement = null;
    activeElementInst = null;
  }
  function handlePropertyChange(nativeEvent) {
    if (nativeEvent.propertyName !== 'value') {
      return;
    }
    if (getInstIfValueChanged(activeElementInst, nativeEvent)) {
      manualDispatchChangeEvent(nativeEvent);
    }
  }
  function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
    if (topLevelType === 'topFocus') {
      stopWatchingForValueChange();
      startWatchingForValueChange(target, targetInst);
    } else if (topLevelType === 'topBlur') {
      stopWatchingForValueChange();
    }
  }
  function getTargetInstForInputEventPolyfill(topLevelType, targetInst, nativeEvent) {
    if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
      return getInstIfValueChanged(activeElementInst, nativeEvent);
    }
  }
  function shouldUseClickEvent(elem) {
    var nodeName = elem.nodeName;
    return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
  }
  function getTargetInstForClickEvent(topLevelType, targetInst, nativeEvent) {
    if (topLevelType === 'topClick') {
      return getInstIfValueChanged(targetInst, nativeEvent);
    }
  }
  function getTargetInstForInputOrChangeEvent(topLevelType, targetInst, nativeEvent) {
    if (topLevelType === 'topInput' || topLevelType === 'topChange') {
      return getInstIfValueChanged(targetInst, nativeEvent);
    }
  }
  function handleControlledInputBlur(inst, node) {
    if (inst == null) {
      return;
    }
    var state = inst._wrapperState || node._wrapperState;
    if (!state || !state.controlled || node.type !== 'number') {
      return;
    }
    var value = '' + node.value;
    if (node.getAttribute('value') !== value) {
      node.setAttribute('value', value);
    }
  }
  var ChangeEventPlugin = {
    eventTypes: eventTypes,
    _allowSimulatedPassThrough: true,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;
      var getTargetInstFunc,
          handleEventFunc;
      if (shouldUseChangeEvent(targetNode)) {
        if (doesChangeEventBubble) {
          getTargetInstFunc = getTargetInstForChangeEvent;
        } else {
          handleEventFunc = handleEventsForChangeEventIE8;
        }
      } else if (isTextInputElement(targetNode)) {
        if (isInputEventSupported) {
          getTargetInstFunc = getTargetInstForInputOrChangeEvent;
        } else {
          getTargetInstFunc = getTargetInstForInputEventPolyfill;
          handleEventFunc = handleEventsForInputEventPolyfill;
        }
      } else if (shouldUseClickEvent(targetNode)) {
        getTargetInstFunc = getTargetInstForClickEvent;
      }
      if (getTargetInstFunc) {
        var inst = getTargetInstFunc(topLevelType, targetInst, nativeEvent);
        if (inst) {
          var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
          return event;
        }
      }
      if (handleEventFunc) {
        handleEventFunc(topLevelType, targetNode, targetInst);
      }
      if (topLevelType === 'topBlur') {
        handleControlledInputBlur(targetInst, targetNode);
      }
    }
  };
  module.exports = ChangeEventPlugin;
})(require('process'));
