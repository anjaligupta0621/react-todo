import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id?: number,
    username: string,
    password: string
}

interface UserState {
    users: User[],
    isLoggedIn: boolean
}

const initialState: UserState = {
  users: [],
  isLoggedIn: false
};


const registerUser = createAsyncThunk<User, User>(
    'auth/register',
    async (payload) => {
        console.log("Inside register user");
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
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

const loginUser = createAsyncThunk<User, User>(
    'auth/login',
    async (payload) => {
        console.log("Inside login user");
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
        state.isLoggedIn = false
      },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<object>) => {
        console.log("From frontend login", action.payload)
        if (action.payload) {
            state.isLoggedIn = true;
        }
    })
  },
});

export const { logoutUser } = authSlice.actions;

export {registerUser, loginUser};

export default authSlice.reducer;
