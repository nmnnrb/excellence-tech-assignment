import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', user);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
       <div className="flex justify-between items-center">
       <h2 className='text-xl font-bold mb-4'>Register</h2>
       <h2  onClick={() => navigate('/')} className='text-xl bg-blue-500 px-4 py-2 hover:bg-blue-800 transition duration-300 text-white font-bold mb-4'>Login</h2>
       </div>
        <input type='text' name='username' placeholder='Username' className='border p-2 w-full mb-2' onChange={handleChange} required />
        <input type='email' name='email' placeholder='Email' className='border p-2 w-full mb-2' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' className='border p-2 w-full mb-2' onChange={handleChange} required />
        <button type='submit' className='bg-blue-500 text-white p-2 w-full rounded'>Register</button>
      </form>
    </div>
  );
}