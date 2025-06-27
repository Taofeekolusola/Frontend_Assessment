// pages/Subscribe.jsx
import { useState } from "react";
import api from "../../services/api";

export default function Subscribe() {
  const [subscriptionId, setSubscriptionId] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/ParticipantSubscription/subscribe", {
        subscriptionId,
      });
      setMessage("Successfully subscribed!");
    } catch (err) {
      setMessage("Subscription failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Subscribe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(Number(e.target.value))}
          placeholder="Enter Subscription ID"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}