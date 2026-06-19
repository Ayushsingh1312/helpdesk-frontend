import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar(){
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return(
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">HelpDesk</h1>

            <div className="flex items-center gap-4">
                <span>Hi, {user?.name}</span>
                <span className="bg-blue-800 px-2 py-1 rounded text-xs uppercase">
                    {user?.role}
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;