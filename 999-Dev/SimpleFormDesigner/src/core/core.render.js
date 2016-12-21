module.exports = function(designer){
	
	var render = function(){
		console.log("render");
	}
	
	designer.render = render;
}