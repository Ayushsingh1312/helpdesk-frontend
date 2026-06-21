import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/tickets/new" 
        element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        }
        />
        <Route 
          path="/tickets/:id"
          element = {
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;
