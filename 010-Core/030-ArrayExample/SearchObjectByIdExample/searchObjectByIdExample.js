function searchObjectById(obj, id){
  if (obj.id == id){
    return obj;
  }else{
    var items = obj.items;
    if (typeof items != 'undefined'){
      for (var i=0; i<items.length; i++){
        var item = items[i];
        if (item.id == id){
          return item;
        }else{
          var result = searchObjectById(item, id);
          if (typeof result != 'undefined'){
            return result;
          }
        }
      }
    }
  }
}

var obj = {
  id: '1',
  items:[
    {
      id: '2',
      items:[{id:'3'}, {id:'4'}, {id:'4'}]
    },
    {
      id: '5',
      items:[{id:'6'}, {id:'7'}, {id:'8'}]
    }
  ]
};

var result = searchObjectById(obj, '7');
console.log(result);
