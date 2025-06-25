// pages/LoadFundRequest.jsx
import { useState } from "react";
import api from "../../services/api";

export default function LoadFundRequest() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Wallet/LogFundRequest", { amount: parseFloat(amount) });
      setMessage("Fund request submitted.");
    } catch {
      setMessage("Failed to submit fund request.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Fund Wallet</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="number" placeholder="Amount" className="border p-2 w-full" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}