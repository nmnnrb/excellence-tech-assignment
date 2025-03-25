import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
    const { id } = useParams(); // Get todo ID from URL
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
      }, [navigate]);
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        category: ""
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No auth token found");
                    return;
                }

                const response = await axios.get(`https://excellence-tech-assignment.onrender.com/todos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTodo(response.data); // Set the fetched todo
            } catch (error) {
                console.error("Error fetching todo:", error.response?.data || error.message);
            }
        };

        fetchTodo();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No auth token found");
                return;
            }

            await axios.put(`https://excellence-tech-assignment.onrender.com/todos/${id}`, todo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate("/"); // Redirect back to Todo List
        } catch (error) {
            console.error("Error updating todo:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Edit Todo</h2>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input 
                        type="text"
                        name="title"
                        value={todo.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea 
                        name="description"
                        value={todo.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input 
                        type="text"
                        name="category"
                        value={todo.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between">
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Todo
                    </button>

                    <button 
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTodo;
