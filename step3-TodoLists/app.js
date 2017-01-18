import bar from './bar';
import Vue from 'vue';

var app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todoList: []
    },
    // created: function(){
    //      // let i = 0;
    //      // setInterval(()=>{
    //      //     this.newTodo = i // this.newTodo 就是 data.newTodo，实际上 this.newTodo 是 data.newTodo 的代理
    //      //    i+= 1
    //      // },1000);
    //
    //      // setInterval(()=>{
    //      //     console.log(this.newTodo)
    //      // },1000);
    // }
    created: function(){
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString);

            let newTodoString = this.newTodo;
            window.localStorage.setItem('myNewTodo',newTodoString);
        }
        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];

        let oldNewTodoString = window.localStorage.getItem('myNewTodo');
        this.newTodo = oldNewTodoString || '';
    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().toLocaleString(),
                done: false
            })
            this.newTodo = '';
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);
        }
    }
})

