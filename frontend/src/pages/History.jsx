import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const History = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/history`, {
          headers: { token },
        });
        const data = await response.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchHistory();
  }, [token, backendUrl]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`${backendUrl}/api/history/${id}`, {
        method: "DELETE",
        headers: { token },
      });
      const data = await res.json();
      if (data.success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete the image");
      }
    } catch (error) {
      alert("Error deleting image");
      console.error(error);
    }
  };

  const handleDownload = (base64Data, prompt, createdAt) => {
    const link = document.createElement("a");
    link.href = base64Data;
    const safePrompt = prompt
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()
      .substring(0, 20);
    const datePart = new Date(createdAt).toISOString().slice(0, 10);
    link.download = `image_${safePrompt || "prompt"}_${datePart}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="history-page">
      <h1 className="text-white text-3xl mb-6 text-center">History</h1>

      {loading ? (
        <div className="text-white text-center mt-20 text-lg animate-pulse">
          Loading your image history...
        </div>
      ) : history.length === 0 ? (
        <p className="text-white text-center">No history found.</p>
      ) : (
        <div className="history-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="history-item bg-zinc-800 pt-4 pb-4 rounded-xl flex flex-col items-center shadow-lg"
            >
              <img
                src={item.image}
                alt="Generated"
                className="max-w-full max-h-60 rounded mb-4 object-contain"
              />
              <p className="text-white mb-2 text-center px-2">{item.prompt}</p>
              <small className="text-zinc-400 mb-4 block">
                {new Date(item.createdAt || item.timestamp).toLocaleString()}
              </small>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleDownload(
                      item.image,
                      item.prompt,
                      item.createdAt || item.timestamp
                    )
                  }
                  className="border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors text-purple-500 px-5 py-2 rounded-md shadow-md flex items-center gap-2"
                  title="Download Image"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="border border-red-500 hover:bg-red-500 hover:text-white transition-colors text-red-500 px-5 py-2 rounded-md shadow-md flex items-center gap-2"
                  title="Delete Image"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
