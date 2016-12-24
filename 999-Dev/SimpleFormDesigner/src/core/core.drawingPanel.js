/*jslint node: true */
/*global $: true */
'use strict';

module.exports = function (designer) {

    var drawingPanelId = "drawingPanel";

    var drawingPanel = {
        getDrawingPanel: function () {
            var drawingPanelColumn = $("<td></td>");
            var drawingPanel = $("<div></div>");
            drawingPanel.attr("id", drawingPanelId);
            drawingPanelColumn.append(drawingPanel);

            drawingPanel.sortable({
                connectWith: "div.control.container",
                handle: '.handle',
                receive: function (event, ui) {}
            }).selectable({
                cancel: ".handle",
                filter: "input",
                selected: function (event, ui) {
                    if (ui.selected.checked) {
                        ui.selected.checked = false;
                    } else {
                        ui.selected.checked = true;
                    }
                },
                unselected: function (event, ui) {
                    ui.unselected.checked = false;
                }
            });
            return drawingPanelColumn;
        }
    };

    designer.drawingPanel = drawingPanel;
};
