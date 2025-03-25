import axios from 'axios';
export default function TodoItem({ todo, setTodos }) {
  const deleteTodo = () => {
    axios.delete(`http://localhost:5000/todos/${todo._id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(() => setTodos(prev => prev.filter(t => t._id !== todo._id)));
  };

  return (
    <li className='flex justify-between p-2 border-b'>
      <span>{todo.title}</span>
      <button className='text-red-500' onClick={deleteTodo}>Delete</button>
    </li>
  );
}