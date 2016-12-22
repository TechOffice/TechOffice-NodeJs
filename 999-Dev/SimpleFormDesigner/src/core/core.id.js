module.exports = function(designer){

	var idPrefix = "ID";

	var id = function(){

	}

	id.currentSeq = 0;

	id.getCurrentId = function(){
		return idPrefix + id.currentSeq;
	};

	id.getNextId = function(){
		id.currentSeq = id.currentSeq + 1;
		return idPrefix + id.currentSeq;
	}

	designer.id = id;
}
