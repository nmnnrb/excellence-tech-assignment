import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Navigate, useNavigate } from "react-router-dom";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Not Urgent"); // Default value
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
      }, [navigate]);
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const token = localStorage.getItem("token"); // Retrieve the token from local storage
          if (!token) {
           
              console.error("No auth token found");
              return;
          }
  
        
          const response = await axios.post(
            "https://excellence-tech-assignment.onrender.com/todos",
            { title, description, category },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        );
        
  
          console.log("Todo added:", response.data);
          console.log("token is" , localStorage.getItem('token'))
          navigate("/todos"); 
      } catch (error) {
          console.error("Error adding todo:", error.response?.data || error.message);
      }
  };
  
  

    return (

        <>

<h2  onClick={() => navigate('/todos')} className='text-xl bg-blue-500 px-4 py-2 hover:bg-blue-800 transition duration-300 text-white font-bold mb-4'>Back to all List</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <input
                type="text"
                className="w-1/3 bg-gray-200 p-2 rounded"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Enter description..."
                 className="w-1/3 bg-gray-200 p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={category}  className=" bg-gray-200 p-2 rounded" onChange={(e) => setCategory(e.target.value)}>

                <option value="Urgent">Urgent</option>
                <option value="Not Urgent">Not Urgent</option>
            </select>
            <button className="bg-blue-500 transition duration-300 px-4 py-2 rounded-lg hover:bg-green-500" type="submit">Add Todo</button>
            </div>
        </form>

        </>
    );
};

export default TodoForm;
