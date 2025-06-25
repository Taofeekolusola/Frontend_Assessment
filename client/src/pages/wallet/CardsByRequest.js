// pages/CardsByRequest.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CardsByRequest() {
  const { requestid } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get(`/api/CardRequest/Cards/${requestid}`)
      .then(res => setCards(res.data))
      .catch(() => setCards([]));
  }, [requestid]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cards for Request #{requestid}</h2>
      <ul>
        {cards.map((card, i) => (
          <li key={i} className="border p-2 my-1 rounded">
            Card No: {card.cardNumber} | Status: {card.status}
          </li>
        ))}
      </ul>
    </div>
  );
}