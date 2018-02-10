import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            nextId: 1
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }
  // add array into local storage
    getList(){
        var getList = localStorage.getItem('list');
        getList = JSON.parse(getList);
        console.log(getList)
        if(getList){
            this.setState({todos : getList})
        }
    }
    componentWillMount(){
        this.getList();
    }
    
    addTodo(todoText) {
        let todos = this.state.todos;
        todos.push({ id: this.state.nextId, text: todoText })
        this.setState({
                todos: todos,
                nextIdid: ++this.state.nextId
            }
        );
        localStorage.setItem('list', JSON.stringify(this.state.todos))
    }
    
    removeTodo(id) {
        console.log(id)
        
        this.setState({
            todos: this.state.todos.filter((todo, index) => todo.id !== id)
            
        });
        console.log(this.state.todos)

//                 localStorage.setItem.filter('list', JSON.stringify(this.state.todos))

                localStorage.setItem('list', JSON.stringify(this.state.todos))
      
      };

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
                        />
                    }

                )
            } </ul> </div >

            </div>


        );
    }
}

export default App;
