import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem("token"); 
                if (!token) {
                    console.error("No auth token found");
                    return;
                }

                const response = await axios.get("https://excellence-tech-assignment.onrender.com/todos", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTodos(response.data); 
            } catch (error) {
                console.error("Error fetching todos:", error.response?.data || error.message);
            }
        };

        fetchTodos();
    }, []);

    // Function to handle delete
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No auth token found");
                return;
            }

            await axios.delete(`https://excellence-tech-assignment.onrender.com/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Remove the deleted todo from state
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-center items-center gap-12 mt-12">
                <h2 className="text-xl bg-blue-500 px-4 py-2 hover:bg-blue-800 transition duration-300 text-white font-bold mb-4">
                    Todo List
                </h2>
                <h2
                    onClick={() => navigate("/create")}
                    className="text-xl bg-blue-500 px-4 py-2 hover:bg-blue-800 transition duration-300 text-white font-bold mb-4 cursor-pointer"
                >
                    Create New List +
                </h2>
            </div>

            {todos.length === 0 ? (
                <p className="text-center text-gray-600">No todos found</p>
            ) : (
                <div className="flex gap-4 p-4 overflow-x-auto">
                    {todos.map((todo) => (
                        <div 
                            key={todo._id} 
                            className="bg-gray-300 flex-shrink-0 w-64 h-48 flex flex-col justify-center items-center rounded-2xl text-black p-4 shadow-md relative"
                        >
                            <strong>{todo.title}</strong>
                            <p>{todo.description}</p>
                            <p className="text-sm text-gray-700">({todo.category})</p>

                            <div className="mt-4 flex gap-2">
                                {/* Edit Button */}
                                <button 
                                    onClick={() => navigate(`/edit/${todo._id}`)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition"
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button 
                                    onClick={() => handleDelete(todo._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoList;
