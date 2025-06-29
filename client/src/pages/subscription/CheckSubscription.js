import { useState } from "react";
import api from "../../services/api";

export default function CheckSubscriptionStatus() {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [status, setStatus] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/ParticipantSubscription/check_subscription", {
        subscriptionId: parseInt(subscriptionId),
        participantID: parseInt(participantId),
      });

      console.log("API Response:", res.data);
      setStatus(res.data?.data ? "✅ User is subscribed" : "❌ User is NOT subscribed");
    } catch (err) {
      console.error("Check subscription error:", err);
      setStatus("⚠️ Error checking subscription.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Check Subscription</h2>
      <form onSubmit={handleCheck} className="space-y-4">
        <input
          type="number"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(e.target.value)}
          placeholder="Subscription ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          placeholder="Participant ID"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Check
        </button>
      </form>
      {status && <p className="mt-4 text-center font-medium">{status}</p>}
    </div>
  );
}