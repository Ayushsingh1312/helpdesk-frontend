import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/tickets");
        setTickets(res.data.tickets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
        {tickets.map((ticket) => (
          <Link to={`/tickets/${ticket._id}`}>
            <div key={ticket._id} className="bg-white p-4 rounded shadow mb-3">
            <h3 className="font-bold">{ticket.title}</h3>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
