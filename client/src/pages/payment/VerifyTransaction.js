// pages/VerifyTransaction.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function VerifyTransaction() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/api/Payment/verify-transaction")
      .then(res => setResult(res.data))
      .catch(() => setResult(null));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Verify Transaction</h2>
      {result ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
      ) : (
        <p>Unable to verify.</p>
      )}
    </div>
  );
}