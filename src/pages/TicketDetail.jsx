import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Badge from "../components/Badge";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        {/* Ticket Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {ticket.title}
          </h2>
          <p className="text-gray-600 mb-4">{ticket.description}</p>
          <div className="flex gap-3">
            <Badge type="status" value={ticket.status} />
            <Badge type="priority" value={ticket.priority} />
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💬 Comments ({comments.length})
          </h3>

          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No comments yet. Be the first!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-gray-100 pb-3 mb-3 last:border-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    {comment.user?.name}
                  </p>
                  <small className="text-gray-400 text-xs">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
                <p className="text-gray-600 text-sm">{comment.text}</p>
              </div>
            ))
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mt-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
