/* */ 
'use strict';
var _require = require('./ReactBaseClasses'),
    Component = _require.Component;
var _require2 = require('./ReactElement'),
    isValidElement = _require2.isValidElement;
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');
var factory = require('create-react-class/factory');
module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);
