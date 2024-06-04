import logo from './logo.svg';
import './App.css';
import Todolist from './components/Todolist';
import ReduxTodolist from './components/ReduxTodolist';

function App() {
  return (
    <div style={{ margin: '100px' }}>
      <ReduxTodolist />
    </div>
  );
}

export default App;
