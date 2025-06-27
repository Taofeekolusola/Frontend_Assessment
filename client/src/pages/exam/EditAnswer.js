// pages/EditQuestion.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditQuestionAnswer() {
  const { questionid } = useParams();
  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    correctOption: 5,
    image: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "correctOption" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/Question/EditAnswer/${questionid}`, formData);
      setMessage("Question updated.");
    } catch {
      setMessage("Failed to update question.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Question</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {["questionText", "option1", "option2", "option3", "option4", "option5", "image"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 border rounded"
          />
        ))}
        <input
          type="number"
          name="correctOption"
          value={formData.correctOption}
          onChange={handleChange}
          placeholder="Correct Option (1-5)"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">
          Save Changes
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}