import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MySubscriptions() {
  const [mySubs, setMySubs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/api/Subscription/MySubscriptions");
      setMySubs(res.data.data || []);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Subscriptions</h2>
      {mySubs.length === 0 ? (
        <p>No subscriptions yet.</p>
      ) : (
        <ul>
          {mySubs.map((sub, i) => (
            <li key={i} className="border p-3 mb-2 bg-white rounded shadow">
              <strong>{sub.planName}</strong> - Expiry: {sub.expiryDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}