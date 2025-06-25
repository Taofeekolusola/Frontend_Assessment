// pages/ApproveFundRequest.jsx
import { useState } from "react";
import api from "../../services/api";

export default function ApproveFundRequest() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const approve = async () => {
    try {
      await api.put(`/api/Wallet/ApproveFundRequest/${id}`);
      setMessage("Fund request approved.");
    } catch {
      setMessage("Approval failed.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Approve Fund Request</h2>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="border p-2 w-full" placeholder="Fund Request ID" />
      <button onClick={approve} className="bg-blue-700 text-white px-4 py-2 mt-2 rounded">Approve</button>
      {message && <p>{message}</p>}
    </div>
  );
}