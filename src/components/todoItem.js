import React from 'react';
import './todoItem.css';
export default class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            edit :false,
            newTodoItem:""
        }
        this.removeTodo=this.removeTodo.bind(this);
        this.completeTodo=this.completeTodo.bind(this);
        this.enableEdit=this.enableEdit.bind(this);
        this.disableEdit=this.disableEdit.bind(this);
        this.onSave=this.onSave.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    removeTodo(id) {
            this.props.removeTodo(id);
        }
        completeTodo(id){
            this.props.completeTodo(id);
            this.disableEdit()
        }
        enableEdit(){
            this.setState({edit: true,
                newTodoItem:this.props.todo.text
            })
        }
        disableEdit(){
            this.setState({edit:false})
        }
        onSave(){
            this.props.onSave(this.props.todo.id,this.state.newTodoItem)
            this.disableEdit()
        }
        onChange(e){

            this.setState({newTodoItem: e.target.value})
        }
        render() {
            return(<div className="todoWrapper">
           {
               !this.props.todo.completed ? 
               <input type="checkbox" className="completeTodo" onClick={ (e)=>this.completeTodo(this.props.id)}></input>:
               null
            }
            {
                this.state.edit ? 
                <div>
                    <button className="removeTodo" onClick={this.onSave}>Save</button>
                    <button className="removeTodo cancel" onClick={this.disableEdit}>Cancel</button>
                    </div>: !this.props.todo.completed ?
                    <div>
                        <button className="removeTodo edit" onClick={this.enableEdit}>Edit</button>
                        </div>:null
                     }
                     {
                         !this.state.edit? <button className="removeTodo" onClick={ (e)=>this.removeTodo(this.props.id)}>remove</button>:null
                         }
               {
                   this.state.edit? <input type="text" className="edit-input" value={this.state.newTodoItem} onChange={this.onChange} />:null
                   }
              {
                  !this.state.edit? <p> {!this.props.todo.completed ? this.props.todo.text : <del>{this.props.todo.text}</del>}</p>:null
                  }
                 </div> )
                 }
                }