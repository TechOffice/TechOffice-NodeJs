module.exports = function(designer){
	
	var idPrefix = "ID";
	
	var id = function(){
		
	}
	
	id.currentSeq = 0;
	
	id.getCurrentId(){
		return idPrefix + id.currentSeq;
	}
	
	id.getNextId(){
		id.currentSeq = id.currentSeq + 1;
		return idPrefix + id.currentSeq;
	}
	
	designer.id = id;
}