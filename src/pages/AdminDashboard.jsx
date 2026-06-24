import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    highPriorityTickets: 0,
  });
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResponse, ticketsResponse] = await Promise.all([
          API.get("/dashboard/stats"),
          API.get("/tickets"),
        ]);
        setStats(statsResponse.data);
        setTickets(ticketsResponse.data.tickets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleStatusChange = async (tickedId, newStatus) => {
    try {
      await API.put(`/tickets/${tickedId}`, { status: newStatus });
      setTickets(
        tickets.map((t) =>
          t._id === tickedId ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Stats Cards */}
        
        {/* Total Tickets */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded shadow text-center">
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalTickets}
          </p>
          <p className="text-blue-700">Total Tickets</p>
        </div>

        {/* Open Tickets */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded shadow text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {stats.openTickets}
          </p>
          <p className="text-yellow-700">Open</p>
        </div>

        {/* In Progress */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded shadow text-center">
          <p className="text-3xl font-bold text-orange-600">
            {stats.inProgressTickets}
          </p>
          <p className="text-orange-700">In Progress</p>
        </div>

        {/* Resolved */}
        <div className="bg-green-50 border border-green-200 p-4 rounded shadow text-center">
          <p className="text-3xl font-bold text-green-600">
            {stats.resolvedTickets}
          </p>
          <p className="text-green-700">Resolved</p>
        </div>

        {/* High Priority */}
        <div className="bg-red-50 border border-red-200 p-4 rounded shadow text-center">
          <p className="text-3xl font-bold text-red-600">
            {stats.highPriorityTickets}
          </p>
          <p className="text-red-700">High Priority</p>
        </div>

        {/* Tickets List */}
        <h3 className="mt-4 mb-4 font-bold text-2xl">All Tickets</h3>
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
            >
              {/* Left Side */}
              <div>
                <h4 className="font-bold">{ticket.title}</h4>
                <p className="text-sm text-gray-500">
                  Priority: {ticket.priority}
                </p>
                <p className="text-sm text-gray-500">
                  By: {ticket.createdBy?.name}
                </p>
              </div>

              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
