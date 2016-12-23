module.exports = function(){

	var desinger = {
		init: function(containerId){
			var container = $("#"+containerId);
			var designerTable = $("<table></table>");
			var designerTableRow = $("<tr></tr>");
			designerTableRow.append(this.controlPanel.getControlPanel());
			designerTableRow.append(this.drawingPanel.getDrawingPanel());
			designerTableRow.append(this.attributePanel.getAttributePanel());
			designerTable.append(designerTableRow);
			container.append(designerTable);
		}
	};

	return desinger;

}
