import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/Subscription/ListSubscription")
      .then((res) => {
        const result = res.data?.data || [];
        setSubscriptions(result);
        console.log("All Subscriptions:", result);
      })
      .catch((err) => {
        setError("Failed to fetch subscriptions");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading subscriptions...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <ul className="space-y-4">
          {subscriptions.map((plan) => (
            <li key={plan.subId} className="border p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">{plan.subName}</h3>
              <p>Price: ₦{plan.subAmount}</p>
              <p>Duration: {plan.subDuration} days</p>
              <p className="text-gray-600">{plan.subDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}