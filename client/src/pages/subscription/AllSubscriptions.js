import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/Subscription/ListSubscription");
      setSubscriptions(res.data.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Subscription Plans</h2>
      <ul>
        {subscriptions.map((sub, idx) => (
          <li key={idx} className="border p-3 my-2 rounded bg-white shadow">
            <strong>{sub.name}</strong> - {sub.price} NGN
          </li>
        ))}
      </ul>
    </div>
  );
}