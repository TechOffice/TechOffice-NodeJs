// Define a singleFactory object 
var singletonFactory = (function(){
	var instance;

	function init() {
		var value1 = "value1";
		return {
			getValue1: function(){
				return value1;
			},
			setValue1: function(lvalue1){
				value1 = lvalue1;
			}
		};
		// This a module pattern which would be used to provide private and public encapsulation for class in Javascript.
	};
	
	return {
		getInstance: function(){
			if ( !instance){
				instance = init();
			}
			return instance;
		}
	};
	
})();


var instance = singletonFactory.getInstance();
console.log(instance.getValue1());
instance.setValue1("value2");
var instance2 = singletonFactory.getInstance();
console.log(instance2.getValue1());