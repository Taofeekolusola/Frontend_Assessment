import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CardDenominations() {
  const [denominations, setDenominations] = useState([]);

  useEffect(() => {
    api.get("/api/CardRequest/CardDeniminations")
      .then(res => {
        console.log("✅ Card denominations response:", res.data);
        
        // If the response wraps the denominations inside a property like `data` or `denominations`, extract it
        const values = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setDenominations(values);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch denominations:", err);
        setDenominations([]);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Card Denominations</h2>
      <ul className="list-disc ml-4">
        {denominations.map((d, i) => (
          <li key={i}>{typeof d === "object" ? JSON.stringify(d) : d}</li>
        ))}
      </ul>
    </div>
  );
}