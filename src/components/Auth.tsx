import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser, registerUser } from '../redux/Slice/AuthSlice';

const Auth = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (username: string, password: string) => {
        console.log(username, password);
        const user = {
            username: userName,
            password: password
        }
        dispatch(loginUser(user));
        setUserName('');
        setPassword('');
    }

    const handleSignUp = (username: string, password: string) => {
        console.log(username, password);
        const user = {
            username: userName,
            password: password
        }
        dispatch(registerUser(user));
        setUserName('');
        setPassword('');
    }

  return (
    <div>
      <input type='text' placeholder='username' value={userName} onChange={(event) => setUserName(event.target.value)} />
      <input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
      <div>
        <button onClick={() => handleLogin(userName, password)}>Login</button>
        <button onClick={() => handleSignUp(userName, password)}>Sign Up</button>
      </div>
    </div>
  )
}

export default Auth
