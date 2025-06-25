// src/pages/RegisteredParticipantExam.jsx
import { useState } from "react";
import api from "../../services/api";

export default function RegisteredParticipantExam() {
  const [examID, setExamID] = useState("");
  const [participant, setParticipant] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = () => {
    api.get(`/api/Exam/RegisteredParticipantExam/${examID}`)
      .then(res => setParticipant(res.data))
      .catch(() => setError("Failed to fetch participant info."));
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Participant Info for Exam</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={examID}
          onChange={(e) => setExamID(e.target.value)}
          placeholder="Exam ID"
          className="border p-2 flex-grow rounded"
        />
        <button onClick={handleFetch} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Fetch
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {participant && (
        <div className="p-4 bg-gray-100 rounded">
          <pre className="text-sm">{JSON.stringify(participant, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}