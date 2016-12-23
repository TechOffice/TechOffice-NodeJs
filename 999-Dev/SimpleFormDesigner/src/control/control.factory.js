module.exports = function(designer){
	
	var handleHeight = 30;
	
	var factory = function(){
		
	}
	
	factory.getDiv = function(){
		var control = $("<div></div>");
		var handle = $("<div class='drawing handle'></div>");
		var content = $("<div class='drawing content'></div>");
		var div = $("<div class='drawing div'></div>")
		var select = $("<div class='drawing select'></div>");
		var checkbox = $("<input type='checkbox'/>");

		control.append(handle);
		select.append(checkbox);
		content.append(select);
		content.append(div);
		control.append(content);
		return control;
	}

	designer.control.factory = factory;
}