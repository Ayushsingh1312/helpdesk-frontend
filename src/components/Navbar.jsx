import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎫</span>
        <h1 className="text-xl font-bold text-gray-800">HelpDesk</h1>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Admin Panel link */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200 font-medium"
          >
            Admin Panel
          </Link>
        )}

        {/* New Ticket link */}
        {user?.role === "user" && (
          <Link
            to="/tickets/new"
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium"
          >
            + New Ticket
          </Link>
        )}

        {/* User info */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
          <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-semibold">
            {user?.role}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium px-2"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
