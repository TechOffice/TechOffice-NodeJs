import { observable, autorun} from "mobx"

class Todo {
    id = Math.random()
    @observable title = ""
    @observable finished = false
}

const todo = new Todo();

autorun(() => {
    console.log(todo.title);
})

var times = 0;
setInterval(() => {
    times++;
    todo.title = "testing title " + times ; 
}, 1000)
