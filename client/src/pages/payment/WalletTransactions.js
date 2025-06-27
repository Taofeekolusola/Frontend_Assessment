// pages/WalletTransactions.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function WalletTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/api/Transaction/WalletTransactions")
      .then(res => setTransactions(res.data))
      .catch(() => setTransactions([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Wallet Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx, i) => (
          <li key={i} className="border p-2 rounded">
            Amount: {tx.amount} | Type: {tx.transactionType} | Date: {tx.date}
          </li>
        ))}
      </ul>
    </div>
  );
}