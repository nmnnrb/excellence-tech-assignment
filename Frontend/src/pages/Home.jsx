import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://excellence-tech-assignment.onrender.com/todos', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setTodos(res.data));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
} 