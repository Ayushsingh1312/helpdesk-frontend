import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api/axios'
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Change handler for all inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const res = await API.post('/auth/login', formData);

            login(res.data);
            
            navigate('/dashboard');
        }catch(err){
            setError(err.response?.data?.message || 'Something went wrong');
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border rounded"
                />

                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 mb-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center">Don't have an account? 
                   <Link to="/register" className="text-blue-600 ml-1">Register</Link> 
                </p>
            </form>
        </div>
    );
}

export default Login;