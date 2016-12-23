module.exports = function(designer) {

  controlFactory = {
    getControl: function(type) {
      switch (type) {
        case 'hbox':
          return this.getHbox();
          break;
        case 'vbox':
          return this.getVbox();
          break;
        case 'label':
          return this.getLabel();
          break;
        case 'text':
          return this.getText();
          break;
        case 'checkbox':
          return this.getCheckbox();
          break;
        case 'radiobox':
          return this.getRadiobox();
          break;
        case 'table':
          return this.getTable();
          break;
        case 'button':
          return this.getButton();
          break;
      }
    },
    getSortableControl: function(control) {
      control.find("div.control.container").sortable({
        handle: ".handle",
        connectWith: "#panel, div.control.container",
        receive: function(event, ui) {
          // perform receive function
          controlManager.addControl(ui.sender, this, ui.helper);
        }
      });
      return control;
    },
    getHbox: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox'>HBox  <div class='control hbox container'></div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getVbox: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />VBox  <div class='control vbox container'></div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getLabel: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />Text Input  <div class='control'>Label</div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getText: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'>  <input type='checkbox' />Text Input  <div class='control'><input type='text' value=''>  </div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getCheckbox: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Radio<div class='control'><input type='radio'></div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getRadiobox: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Radio<div class='control'><input type='radio'></div></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getTable: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'> <input type='checkbox' />Table <table class='control'><tr> <td><div class='control container'></div> </td> <td><div class='control container'></div> </td> </td></tr><tr> <td><div class='control container'></div> </td> </td> <td><div class='control container'></div> </td> </td></tr> </table></div></div>");
      control = this.getSortableControl(control);
      return control;
    },
    getButton: function() {
      var control = $("<div class='container'><div class='handle'></div><div class='content'><input type='checkbox' />Button <div class='control'><button>Button</button></div></div></div>");
      control = this.getSortableControl(control);
      return control;
    }
  };

  designer.controlFactory = controlFactory;

}