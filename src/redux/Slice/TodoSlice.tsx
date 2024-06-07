import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id?: string,
    content: string
}

interface TodoState {
    todolist: Todo[]
}

const initialState: TodoState = {
  todolist: [],
};

const fetchTodos = createAsyncThunk<any>(
    'todos/fetchTodos',
    async() => {
        console.log("inside async")
    try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        return data;
        } catch (err) {
            console.log(err)
    }
    },
  )

const addTodo = createAsyncThunk<Todo, Todo>(
    'todos/addTodos',
    async (payload) => {
        console.log("Inside create todos");
        try {
            const response = await fetch('http://localhost:3000/todos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch(err) {
            console.log(err);
        }
    }
)

const removeTodo = createAsyncThunk<Todo, any>(
    'todos/removeTodo',
    async (payload) => {
        console.log("Inside remove todos");
        try {
            const response = await fetch(`http://localhost:3000/todos/${payload.id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch(err) {
            console.log(err);
        }
    }
)

const changeTodo = createAsyncThunk<Todo, { id: string; content: {content: string} }>(
    'todos/changeTodo',
    async (payload) => {
        console.log("Inside change todos");
        try {
            const response = await fetch(`http://localhost:3000/todos/${payload.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload.content)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch(err) {
            console.log(err);
        }
    }
)

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action: any) => {
      state.todolist = action.payload.todos;
    })
    .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todolist.push(action.payload);
    })
    .addCase(removeTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todolist = state.todolist.filter((item) => item.id !== action.payload.id);
    })
    .addCase(changeTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todolist = state.todolist.map((item) => {
            if (item.id === action.payload.id) {
                return {...item, content: action.payload.content}
            } else {
                return item;
            }
        })
    })
  },
});

export {fetchTodos, addTodo, removeTodo, changeTodo};

export default todoSlice.reducer;
