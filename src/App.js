import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';
export default class App extends Component {
        constructor(props) {
        super(props);
        this.state = {
            todos: [],
         }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
        this.saveList = this.saveList.bind(this);
        this.onSave = this.onSave.bind(this);
     }
      // add array into local storage
       getList(){
           var getList = localStorage.getItem('list');
            getList = JSON.parse(getList);
            if(getList){
            this.setState({todos : getList})
        }
    }
    componentWillMount(){
        this.getList();
    }
    addTodo(todoText) {
        let todos = this.state.todos;
        todos = [
            ...todos,
            { id:new Date().getTime(), 
              text: todoText ,
              completed:false
            }
        ]
    this.saveList(todos);
    }
    removeTodo(id) {
        const todos =this.state.todos.filter((todo, index) => todo.id !== id)
       this.saveList(todos);
    };
     completeTodo(id){
         let todos = this.state.todos.map(task => {
            return {
              ...task,
              completed: task.id === id ? true : task.completed
            }
          })
          this.saveList(todos);
         }
         saveList(todos){
         this.setState({todos})
         localStorage.setItem('list', JSON.stringify(todos))
        }
     onSave(id,text){
         let todos = this.state.todos.map(task => {
            return {
              ...task,
              text: task.id === id ? text : task.text
            }
          })
          this.saveList(todos);
        }
        render() {
            return ( <div className="App" >
            <div className="todo-wrapper" >
            <Header / >
            <TodoInput todoText=""
            addTodo={ this.addTodo }/>
             <ul > {
                this.state.todos.map((todo)=>{
                        return <TodoItem todo={ todo }
                        key={ todo.id }
                        id={ todo.id }
                        removeTodo={ this.removeTodo }
                        completeTodo={this.completeTodo}
                        onSave={this.onSave}
                        />
                    }

                )
            } </ul> </div >
             </div>
             );
             }
             }

