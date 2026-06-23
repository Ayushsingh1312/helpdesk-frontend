import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  // Filter states
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/tickets", {
          params: {
            status,
            priority,
            search,
            page,
            limit: 5,
          },
        });
        setTickets(res.data.tickets);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [status, priority, search, page]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Tickets</h2>

        {/* Search + Filter Row */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset after filter change
            }}
            className="border p-2 w-full mb-4"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Ticket List */}
        {loading ? (
          <p>Loading...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <Link key={ticket._id} to={`/tickets/${ticket._id}`}>
              <div
                className="bg-white p-4 rounded shadow mb-3"
              >
                <h3 className="font-bold">{ticket.title}</h3>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
              </div>
            </Link>
          ))
        )}

        {/* Pagination */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setPage(page-1)}
            disabled={page===1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.pages}
          </span>

          <button
            onClick={() => setPage(page+1)}
            disabled={page === pagination.pages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
