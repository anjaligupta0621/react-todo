import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../APIs/todoAPIs";

const initialState = {
  todolist: [],
};

const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        console.log("inside async")
      const response = await getTodos();
      console.log(response)
      return response;
    },
  )

const addTodo = createAsyncThunk(
    'todos/addTodos',
    async (payload) => {
        console.log("Inside create todos");
        const response = await createTodo(payload);
        console.log(response);
        return response;
    }
)

const removeTodo = createAsyncThunk(
    'todos/removeTodo',
    async (payload) => {
        console.log("Inside remove todos");
        console.log(payload)
        const response = await deleteTodo(payload.id);
        console.log(response);
        return response;
    }
)

const changeTodo = createAsyncThunk(
    'todos/changeTodo',
    async (payload) => {
        console.log("Inside change todos");
        console.log(payload);
        const response = await updateTodo(payload.id, payload.content);
        console.log(response);
        return response;
    }
)

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todolist = action.payload;
    })
    .addCase(addTodo.fulfilled, (state, action) => {
        state.todolist.push(action.payload);
    })
    .addCase(removeTodo.fulfilled, (state, action) => {
        state.todolist = state.todolist.filter((item) => item.id !== action.payload.id);
    })
    .addCase(changeTodo.fulfilled, (state, action) => {
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
