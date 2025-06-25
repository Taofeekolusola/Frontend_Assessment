// pages/MyCardRequests.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyCardRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/api/CardRequest/MyCardRequests")
      .then(res => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Card Requests</h2>
      <ul className="space-y-2">
        {requests.map((req) => (
          <li key={req.requestID} className="border p-2 rounded">
            Request ID: {req.requestID} | Denomination: {req.cardDenomination} | Quantity: {req.totalCard}
          </li>
        ))}
      </ul>
    </div>
  );
}