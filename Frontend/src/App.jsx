import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import EditTodo from './components/EditTodo';
import Navbar from './components/Navbar';

function App() {
  return (
   <div className='bg-zinc-800 min-h-screen'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/todos' element={<TodoList />} />
      <Route path='/create' element={<TodoForm />} />
      <Route path='/edit/:id' element={<EditTodo />} />
    </Routes>
    </div>
  );
}
export default App;