/*jslint node: true */
/*global $ */
'use strict';

module.exports = function (designer) {

    var controlFactory = {
        getControl: function (type) {
            var control;
            switch (type) {
            case 'hbox':
                control = this.getHbox();
                break;
            case 'vbox':
                control = this.getVbox();
                break;
            case 'label':
                control = this.getLabel();
                break;
            case 'text':
                control = this.getText();
                break;
            case 'checkbox':
                control = this.getCheckbox();
                break;
            case 'radiobox':
                control = this.getRadiobox();
                break;
            case 'table':
                control = this.getTable();
                break;
            case 'button':
                control = this.getButton();
                break;
            }
            return control;
        },
        getSortableControl: function (control) {
            control.find("div.control.container").sortable({
                handle: ".handle",
                connectWith: "#drawingPanel, div.control.container",
                receive: function (event, ui) {
                    // perform receive function
                }
            });
            return control;
        },
        getHbox: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox'>HBox<div class='control hbox container'>&nbsp;</div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getVbox: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />VBox  <div class='control vbox container'>&nbsp;</div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getLabel: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />Text Input  <div class='control'>Label</div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getText: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />Text Input  <div class='control'><input type='text' value=''>  </div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getCheckbox: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Radio<div class='control'><input type='radio'></div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getRadiobox: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Radio<div class='control'><input type='radio'></div></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getTable: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'> <input type='checkbox' />Table <table class='control'><tr> <td><div class='control container'>&nbsp;</div> </td> <td><div class='control container'>&nbsp;</div> </td> </td></tr><tr><td><div class='control container'>&nbsp;</div> </td> </td> <td><div class='control container'>&nbsp;</div> </td> </td></tr> </table></div></div>");
            control = this.getSortableControl(control);
            return control;
        },
        getButton: function () {
            var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Button <div class='control'><button>Button</button></div></div></div>");
            control = this.getSortableControl(control);
            return control;
        }
    };

    designer.controlFactory = controlFactory;

};
