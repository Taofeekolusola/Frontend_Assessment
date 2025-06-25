// pages/CardDenominations.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CardDenominations() {
  const [denominations, setDenominations] = useState([]);

  useEffect(() => {
    api.get("/api/CardRequest/CardDeniminations")
      .then(res => setDenominations(res.data))
      .catch(() => setDenominations([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Card Denominations</h2>
      <ul className="list-disc ml-4">
        {denominations.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}