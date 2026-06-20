import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function CreateTicket () {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "technical",
        priority: "medium",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Change handler for all inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            const res = await API.post('/tickets', formData);

            navigate("/dashboard");

        }catch(err){
            setError(err?.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
           onSubmit={handleSubmit}
           className="bg-white p-8 rounded-lg shadow-md w-96"
        >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Ticket</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input 
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
        />

        <textarea 
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 mb-4 border rounded"
        />

        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="general">General</option>
        </select>

        <select name="priority" value={formData.priority} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
            {loading ? "Creating..." : "Create"}
        </button>
        </form>
        </div>
    );
}

export default CreateTicket;