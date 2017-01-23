import  Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'm84m8zfw9TTQhpNnoTqCSo29-gzGzoHsz';
var APP_KEY = 'DGIkBzyabbK9aqz548Fnx6XY';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app;
app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null
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
    created: function () {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem('myTodos', dataString);

            let newTodoString = this.newTodo;
            window.localStorage.setItem('myNewTodo', newTodoString);
        }
        let oldDataString = window.localStorage.getItem('myTodos');
        let oldData = JSON.parse(oldDataString);
        this.todoList = oldData || [];

        let oldNewTodoString = window.localStorage.getItem('myNewTodo');
        this.newTodo = oldNewTodoString || '';

        this.currentUser = this.getCurrentUser();
    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().toLocaleString(),
                done: false
            })
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
            }, (error) => {
                alert("注册失败");
            });
        },
        login: function () {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
            }, (error) => {
                alert("登录失败");
            });
        },
        getCurrentUser: function () {
            let current = AV.User.current();
            if(current){
                let {id, createdAt, attributes: {username}} = current;
                return {id, username, createdAt};
            }else{
                return null;
            }
        },
        logout: function () {
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload();
        }
    }
});

