import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserDetail() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/User/UserProfile/${userid}`);
        const profileData = res?.data?.data?.profile;
        console.log("✅ Profile data:", profileData);
        setUser(profileData);
      } catch (err) {
        console.error("❌ Error fetching user:", err.response?.data || err.message);
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [userid]);

  const roleMap = {
    32: "Participant",
    42: "Exams",
    52: "Examiner",
    62: "Vendor",
    99: "Administrator",
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading user details...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email:</strong> {user.emailaddress}</p>
        <p><strong>Phone:</strong> {user.phonenumber}</p>
        <p><strong>Role:</strong> {roleMap[user.role] || "Unknown Role"}</p>
      </div>
    </div>
  );
}