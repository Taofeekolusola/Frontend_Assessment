// pages/CardRequestDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CardRequestDetails() {
  const { requestid } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    api.get(`/api/CardRequest/CardRequest/${requestid}`)
      .then(res => setDetails(res.data))
      .catch(() => setDetails(null));
  }, [requestid]);

  if (!details) return <p className="p-4">No details available</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Card Request Details</h2>
      <p>Request ID: {details.requestID}</p>
      <p>Denomination: {details.cardDenomination}</p>
      <p>Total: {details.totalCard}</p>
      <p>Status: {details.status}</p>
    </div>
  );
}