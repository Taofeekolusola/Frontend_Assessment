// pages/MyWallet.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyWallet() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    api.get("/api/Wallet/MyWallet")
      .then(res => setWallet(res.data.data))
      .catch(() => setWallet(null));
  }, []);

  if (!wallet) return <p className="p-4">Unable to load wallet info.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Wallet</h2>
      <p>Balance: ₦{wallet.balance}</p>
      <p>Status: {wallet.status}</p>
    </div>
  );
}