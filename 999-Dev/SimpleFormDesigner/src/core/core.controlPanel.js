module.exports = function(designer){

  var controlPanelId = "controlPanel";

  var controlPanel = {
    getControlPanel: function(){
      var controlPanelColumn = $("<td></td>");
      var controlPanel = $("<div class='controlPanel'></div>");
      controlPanel.attr("id", controlPanelId);
      var controlList = $("<ul><ul>");
      controlList.append(this.getControlItem("hbox"));
      controlList.append(this.getControlItem("vbox"));
      controlList.append(this.getControlItem("table"));
      controlList.append(this.getControlItem("label"));
      controlList.append(this.getControlItem("text"));
      controlList.append(this.getControlItem("checkbox"));
      controlList.append(this.getControlItem("radio"));
      controlPanel.append(controlList);
      controlPanelColumn.append(controlPanel);
      return controlPanelColumn;
    },

    getControlItem: function(type){
      var controlItem = $("<li></li>");
      var control = this.getControl(type);
      controlItem.append(control);
      return controlItem;
    },

    getControl: function(type){
      var control = $("<div class='template'></div>");
      control.html(type);
      control = this.getDraggableControl(control);
      return control;
    },

    getDraggableControl: function(control){
      control = control.draggable({
        helper: function(){
          return designer.controlFactory.getControl($(this).html());
        },
        connectToSortable: "#drawingPanel"
      });
      return control;
    }

  };

  designer.controlPanel = controlPanel;
}
