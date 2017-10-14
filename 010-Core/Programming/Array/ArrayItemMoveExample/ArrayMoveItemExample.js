function arrayMoveItem(arr, oldPosition, newPosition){
  var itemArr = arr.splice(oldPosition, 1);
  var item = itemArr[0];
  arr.splice(newPosition, 0, item);
}

var hello = ['h', 'e', 'l', 'l', 'o'];
console.log("Orginal Array: " + hello);
arrayMoveItem(hello, 1, 0);
console.log("Rearrage Array: " +  hello);
