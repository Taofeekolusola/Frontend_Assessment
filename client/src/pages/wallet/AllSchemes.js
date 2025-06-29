import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllSchemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api.get("/api/WalletScheme/Schemes")
      .then(res => {
        // 👇 Adjust depending on actual structure of API response
        const result = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];

        setSchemes(result);
      })
      .catch(() => setSchemes([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Wallet Schemes</h2>
      {schemes.length === 0 ? (
        <p>No schemes found.</p>
      ) : (
        <ul className="space-y-2">
          {schemes.map((scheme, i) => (
            <li key={i} className="border p-2 rounded">
              {scheme.schemeName} | Code: {scheme.schemeCode} | Role ID: {scheme.schemeRoleID}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}