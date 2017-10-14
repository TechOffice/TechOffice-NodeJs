# Singleton 
It can be implemeneted by created a class with a method that create a new instance of class if one doesn't exit. 

```
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
```