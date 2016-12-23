module.exports = function(designer){

	var drawingPanelId = "drawingPanel";
	var drawingPanelWidth = 500;
	var drawingPanelHeight = 300;

	function initControlPanel(controlPanelColumn){
		var div = $("<div>Div</div>");
		div.draggable({
			helper: function(){
				return designer.control.factory.getDiv();
			},
			connectToSortable: "#drawingPanel"
		});
		controlPanelColumn.append(div);
	}

	function initDrawingPanel(drawingPanelColumn){
		var drawingPanel = $("<div></div>")
		drawingPanel.attr("id", drawingPanelId);
		drawingPanel.width(drawingPanelWidth);
		drawingPanel.height(drawingPanelHeight);
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
	}

	function initAttributePanel(attributePanelColumn){

	}

	var init = function(id){
		var container = $("#"+id);
		var designerTable = $("<table><tr></tr></table>");
		var controlPanelColumn = $("<td><div>Control Panel</div></td>");
		var drawingPanelColumn = $("<td><div>Drawing Panel</div></div>");
		var attributePanelColumn = $("<td><div>Attribute Panel</div></div>");
		initControlPanel(controlPanelColumn);
		initDrawingPanel(drawingPanelColumn);
		initAttributePanel(attributePanelColumn);
		designerTable.append(controlPanelColumn);
		designerTable.append(drawingPanelColumn);
		designerTable.append(attributePanelColumn);
		container.append(designerTable);
	}

	designer.init = init;
}
