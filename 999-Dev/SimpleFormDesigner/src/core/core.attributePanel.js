module.exports = function(designer){
  var attributePanelId = "attributePanel";

  var attributePanel = {
    getAttributePanel: function(){
      var attributePanelColumn = $("<td></td>");
      var attributePanel = $("<div>Attribute Panel</div>");
      attributePanel.attr("id", attributePanelId);
      attributePanelColumn.append(attributePanel);
      return attributePanelColumn;
    }
  };

  designer.attributePanel = attributePanel;
}
