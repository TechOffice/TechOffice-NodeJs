/*jslint node: true */
/*global $ */
'use strict';

module.exports = function (designer) {
  var controlManager = {
    controls : {type:'designer', items: []},

    getControls : function(){
      return this.controls;
    },

    addControl: function(control, container){

    },

    getControl: function(id, container){

    }

  };

  designer.controlManager = controlManager;
}
