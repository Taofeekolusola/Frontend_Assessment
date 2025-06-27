// pages/AllSchemes.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllSchemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api.get("/api/WalletScheme/Schemes")
      .then(res => setSchemes(res.data))
      .catch(() => setSchemes([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Wallet Schemes</h2>
      <ul className="space-y-2">
        {schemes.map((scheme, i) => (
          <li key={i} className="border p-2 rounded">
            {scheme.schemeName} | Code: {scheme.schemeCode} | Role ID: {scheme.schemeRoleID}
          </li>
        ))}
      </ul>
    </div>
  );
}