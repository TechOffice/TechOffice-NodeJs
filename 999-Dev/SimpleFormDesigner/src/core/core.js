/*jslint node: true */
/*global $ */
"use strict";

module.exports = function () {

    var desinger = {
        init: function (containerId) {
            var container, designerTable, designerTableRow;
            container = $("#" + containerId);
            designerTable = $("<table></table>");
            designerTableRow = $("<tr></tr>");
            designerTableRow.append(this.controlPanel.getControlPanel());
            designerTableRow.append(this.drawingPanel.getDrawingPanel());
            designerTableRow.append(this.attributePanel.getAttributePanel());
            designerTable.append(designerTableRow);
            container.append(designerTable);
        }
    };

    return desinger;

};
