module.exports = function(core){
	
	var sub1 = function(name){
		this.name = name;
	}
	
	core.sub1 = sub1;
}