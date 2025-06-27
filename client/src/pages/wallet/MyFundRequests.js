// pages/MyFundRequests.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyFundRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/api/Wallet/MyFundRequest")
      .then(res => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Fund Requests</h2>
      <ul className="space-y-2">
        {requests.map((req, i) => (
          <li key={i} className="border p-2 rounded">
            Amount: {req.amount} | Status: {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
}