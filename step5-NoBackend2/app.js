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
        this.currentUser = this.getCurrentUser();
        this.fetchTodos();
    },
    methods: {
        fetchTodos: function(){
            if(this.currentUser){
                var query = new AV.Query('AllTodos');
                query.find()
                    .then((todos) =>{
                        let avAllTodos = todos[0];
                        let id = avAllTodos.id;
                        this.todoList = JSON.parse(avAllTodos.attributes.content);
                        console.log(this.todoList);
                        this.todoList.id = id;
                    },function(error){
                        console.log(error);
                    })
            }
        },
        updateTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
            avTodos.set('content', dataString);
            avTodos.save().then(()=>{
            console.log('更新成功');
            })
        },
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList);
            var AVTodos = AV.Object.extend('AllTodos');
            var avTodos = new AVTodos();

            var acl =  new AV.ACL();
            acl.setReadAccess(AV.User.current(),true)
            acl.setWriteAccess(AV.User.current(),true)

            avTodos.set('content', dataString);
            avTodos.setACL(acl) // 设置访问控制
            avTodos.save().then((todo) => {
                this.todoList.id = todo.id;
                console.log('保存成功');
                }, function (error) {
                alert('保存失败');
                });
        },
        saveOrUpdateTodos: function(){
            if(this.todoList.id){
                this.updateTodos();
            }else{
                this.saveTodos();
            }
        },
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().toLocaleString(),
                done: false
            })
            this.newTodo = '';
            this.saveOrUpdateTodos();
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveOrUpdateTodos();
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
            }, (error) => {
                alert("注册失败");
                console.log(error);
            });
        },
        login: function () {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser();
                this.fetchTodos();
            }, (error) => {
                alert("登录失败");
                console.log(error);
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

