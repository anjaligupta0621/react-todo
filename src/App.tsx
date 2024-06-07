import React from 'react';
import './App.css';
import ReduxTodolist from './components/ReduxTodolist';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Auth from './components/Auth';

const App: React.FC = () => {

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <div style={{ margin: '100px' }}>
      {
        isLoggedIn ? <ReduxTodolist /> : <Auth />
      }
      
    </div>
  );
}

export default App;
