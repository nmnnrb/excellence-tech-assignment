import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todos');
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://excellence-tech-assignment.onrender.com/auth/login', user);
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>




      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
       <div className="flex justify-between items-center">
       <h2 className='text-xl font-bold mb-4'>Login</h2>
       <h2  onClick={() => navigate('/register')} className='text-xl bg-blue-500 px-4 py-2 hover:bg-blue-800 transition duration-300 text-white font-bold mb-4'>Create</h2>
       </div>  
    <span className='text-sm text-black'>  Email:  <span className='text-black font-bold  text-xs'>demo@ExcellenceTech.com</span></span>
        <input type='email' name='email' placeholder='Email' className='border p-2 w-full mb-2' onChange={handleChange} required />

        <span className='text-sm text-black'>  Password:  <span className='text-black font-bold  text-xs'>demo</span></span>
        <input type='password' name='password' placeholder='Password' className='border p-2 w-full mb-2' onChange={handleChange} required />
        <button type='submit' className='bg-green-500 text-white p-2 w-full rounded'>Login</button>
      </form>
    </div>
  );
}