import { useState } from "react";
import api from "../../services/api";

export default function SubscribePlan() {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Subscription/subscribe", { subscriptionID: parseInt(subscriptionId) });
      setSuccess("Subscription successful!");
      setError("");
    } catch (err) {
      setError("Failed to subscribe. Check subscription ID.");
      setSuccess("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Subscribe to a Plan</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Subscription ID"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
    </div>
  );
}