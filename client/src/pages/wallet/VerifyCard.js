// pages/VerifyCard.jsx
import { useState } from "react";
import api from "../../services/api";

export default function VerifyCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");

  const verify = async () => {
    try {
      await api.post("/api/Wallet/VerifyCard", { cardNumber });
      setMessage("Card verified successfully.");
    } catch {
      setMessage("Verification failed.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Verify Card</h2>
      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="border p-2 w-full" placeholder="Card Number" />
      <button onClick={verify} className="bg-indigo-700 text-white px-4 py-2 mt-2 rounded">Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
}