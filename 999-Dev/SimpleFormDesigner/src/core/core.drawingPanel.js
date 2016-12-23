module.exports = function(designer){

	var drawingPanelId = "drawingPanel";

	drawingPanel = {
		getDrawingPanel: function(){
			var drawingPanelColumn = $("<td></td>");
			var drawingPanel = $("<div></div>")
			drawingPanel.attr("id", drawingPanelId);
			drawingPanelColumn.append(drawingPanel);
			
			drawingPanel.sortable({
				receive: function(event, ui){
				},
				handle: '.handle'
			}).selectable({
				cancel: ".handle",
				filter: ".select",
				selected: function(event, ui){
					var selected = $(ui.selected);
				},
				unselected: function(event, ui){
				}
			});
			return drawingPanelColumn;
		}
	};

	designer.drawingPanel = drawingPanel;
}
