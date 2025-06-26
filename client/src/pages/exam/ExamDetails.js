import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ExamDetails() {
    const { examid } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [error, setError] = useState("");
    console.log("Exam ID:", examid);

    useEffect(() => {
        api.get(`/api/Exam/ExamDetails/${examid}`)
            .then((res) => setExam(res.data))
            .catch(() => setError("Failed to load exam details"));
    }, [examid]);

    const handleRegister = async () => {
        try {
            await api.post("/api/Exam/RegisterforExam", { examID: parseInt(examid) });
            navigate("/my-registered-exams");
        } catch {
            setError("Failed to register for the exam.");
        }
    };

    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
    if (!exam) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{exam.examTitle}</h2>
            <p>{exam.examDescription}</p>
            <p><strong>Date:</strong> {exam.examDate}</p>
            <p><strong>Level:</strong> {exam.examLevel}</p>
            <p><strong>Fee:</strong> ₦{exam.examFee}</p>
            <button onClick={handleRegister} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Register for Exam
            </button>
        </div>
    );
}