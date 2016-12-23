module.exports = function(designer){

	var handleHeight = 30;

	var factory = function(){

	};

	factory.getDiv = function(){
		var control = $("<div class='drawing control'></div>");
		var handle = $("<td><div class='drawing handle'></div></td>");
		var content = $("<td class='drawing content'></td>");
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
