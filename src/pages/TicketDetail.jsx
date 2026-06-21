import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const [ticketResponse, commentsResponse] = await Promise.all([
          API.get(`/tickets/${id}`),
          API.get(`/tickets/${id}/comments`),
        ]);
        setTicket(ticketResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetail();
  }, [id]);

  const handleAddComment = async (e) => {
    try {
      e.preventDefault();
      const res = await API.post(`/tickets/${id}/comments`, {
        text: commentText,
      });
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{ticket.title}</h2>
        <p>{ticket.description}</p>
        <p>{ticket.status}</p>
        <p>{ticket.priority}</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Comments</h3>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-3 rounded mb-3">
              <p className="font-semibold">{comment.user?.name}</p>
              <p>{comment.text}</p>

              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}

        <form onSubmit={handleAddComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetail;
