import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, changeTodo, fetchTodos, removeTodo } from '../redux/Slice/TodoSlice';


const ReduxTodolist = () => {

    const todos = useSelector(state => state.todos.todolist);
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [editInput, setEditInput] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleSubmit = async () => {
        const newItem = {
            content: input
        }
        try {
            dispatch(addTodo(newItem));
            setInput('');
        } catch {
            alert("Can't create");
        }
    }

   const handleDelete = async (id) => {
        try {
            dispatch(removeTodo({id: id}));
        } catch(err) {
            alert("Can't delete")
        }
    }

    const handleEdit = async (id) => {
        if (editId === null) {
            setEditId(id);
            const changedContent = todos.find(item => item.id === id).content;
            setEditInput(changedContent);
        } else {
            try {
                dispatch(changeTodo({id, content: {content: editInput}}))
                setEditId(null)
                setEditInput(null);
            } catch(err) {
                alert("Failed to update todo!");
            }
        }
    }

  return (
    <div>
        <div>
            <input value={input} onChange={(event) => {
                    setInput(event.target.value)
                }} 
            />
            <button onClick={handleSubmit}>submit</button>
        </div>
        <div>
            <ul>
                {
                    todos?.map((item, index) => {
                        const isEdit = item.id === editId;
                        return <li key={item.id}>
                            {isEdit ? <input value={editInput} onChange={(event) => {setEditInput(event.target.value)}} /> : <span>{item.content}</span>}
                            {/* if the item is editable, edit buttonis changed to save button */}
                            <button onClick={() => {handleEdit(item.id)}}>{editId === item.id ? <span>save</span> : <span>edit</span>}</button>
                            <button onClick={() => {handleDelete(item.id)}}>delete</button>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default ReduxTodolist
