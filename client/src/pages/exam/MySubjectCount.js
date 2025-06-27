// pages/MySubjectCount.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MySubjectCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/api/Subject/MySubjectCount")
      .then(res => setCount(res.data))
      .catch(() => setCount(0));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">My Subject Count: {count}</h2>
    </div>
  );
}