/*jslint node: true */
/*global designer:true */
designer = require("./core/core.js")();
require("./core/core.controlPanel.js")(designer);
require("./core/core.drawingPanel.js")(designer);
require("./core/core.attributePanel.js")(designer);
require("./core/core.controlfactory.js")(designer);
require("./core/core.controlManager.js")(designer);
