// pages/AllFundRequests.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllFundRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/api/Wallet/FundRequests")
      .then(res => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Fund Requests</h2>
      <ul className="space-y-2">
        {requests.map((req, i) => (
          <li key={i} className="border p-2 rounded">
            Participant: {req.participantName || req.participantID} | Amount: {req.amount} | Status: {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
}