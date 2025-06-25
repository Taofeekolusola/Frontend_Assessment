import { useState } from "react";
import api from "../../services/api";

export default function ExpireSubscriptions() {
  const [message, setMessage] = useState("");

  const expire = async () => {
    try {
      const res = await api.get("/api/Subscription/ExpireSubscriptions");
      setMessage(res.data.message || "Expired successfully.");
    } catch {
      setMessage("Error expiring subscriptions.");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Expire Subscriptions</h2>
      <button
        onClick={expire}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Expire All
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}