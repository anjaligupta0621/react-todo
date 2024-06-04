import React, { Component } from 'react'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../APIs/todoAPIs';

/*
crud:
    save
    get
    delete
    create
*/

export default class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            todolist: [{id:1, content:'breakfast'}, {id:2, content: 'lunch'}],
            editId: null,
            editInput: null,
        }
    }

    componentDidMount = async () => {
        const todos = await getTodos();
        this.setState({todolist: todos.reverse()});
    }

    handleSubmit = async () => {
        const newItem = {
            content: this.state.input
        }
        try {
            const todoRes = await createTodo(newItem)
            this.setState({
                todolist: [todoRes, ...this.state.todolist]
            })
            this.setState({input: ''})
        } catch {
            alert("Can't create");
        }
    }

    handleEdit = async (id) => {
        if (this.state.editId === null) {
            this.setState({ editId: id, editInput: this.state.todolist.find(item => item.id === id).content });
        } else {
            // save the result
            //    const newState = JSON.parse(JSON.stringify(this.state)); -> not recommended
            // it can lose information, and not efficient

            // manual copy: create a new reference for all non-primitive data
            // array.map will create a new array
            // correct way, but can be simplified more
            // const newState = {
            //     ...this.state, 
            //     todolist: this.state.todolist.map(item => {
            //         return {...item};
            //     }) 
            // };
            // newState.todolist.find((item) => item.id === id).content = this.state.editInput;
            // this.setState(newState);
            try {
                await updateTodo(id, {content: this.state.editInput});
                this.setState({...this.state, 
                    editId: null,
                    editInput: null,
                    todolist: this.state.todolist.map((item) => {
                    if (item.id === id) {
                        return {...item, content: this.state.editInput}
                    } else {
                        return item;
                    }
                })})
            } catch(err) {
                alert("Failed to update todo!");
            }

        }

    }

    handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            this.setState({todolist: this.state.todolist.filter((item, index) => {
                return item.id !== id
            })})
        } catch(err) {
            alert("Can't delete")
        }
    }

  render() {
    return (
      <div>
        <div>

            <input value={this.state.input} onChange={(event) => {
                    this.setState({input: event.target.value})
                }} 
            />
            <button onClick={this.handleSubmit}>submit</button>
        </div>
        <div>
            <ul>
                {
                    this.state.todolist?.map((item, index) => {
                        const isEdit = item.id === this.state.editId;
                        return <li key={item.id}>
                            {/* if the item is editable, replace span */}
                            {isEdit ? <input value={this.state.editInput} onChange={(event) => {this.setState({editInput: event.target.value})}} /> : <span>{item.content}</span>}
                            {/* if the item is editable, edit buttonis changed to save button */}
                            <button onClick={() => {this.handleEdit(item.id)}}>{this.state.editId === item.id ? <span>save</span> : <span>edit</span>}</button>
                            <button onClick={() => {this.handleDelete(item.id)}}>delete</button>
                        </li>
                    })
                }
            </ul>
        </div>
      </div>
    )
  }
}
