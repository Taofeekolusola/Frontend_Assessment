import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  console.log("🔥 useEffect triggered");

  const fetchProfile = async () => {
    try {
      console.log("🚀 Fetching profile...");

      const token = localStorage.getItem("token");
      console.log("🪪 Token:", token);

      const response = await api.get("/api/User/Profile");
      console.log("✅ Full response:", response);

      const profileData = response?.data?.data?.profile;
      console.log("📦 Profile data:", profileData);

      setProfile(profileData);
    } catch (err) {
      console.error("❌ Fetch failed:", err.response?.data || err.message || err);
      setError("Failed to fetch profile.");
    }
  };

  fetchProfile();
}, []);



  const roleMap = {
    32: "Participant",
    42: "Exams",
    52: "Examiner",
    62: "Vendor",
    99: "Administrator",
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  if (!profile) return <p className="text-center mt-4">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
        <p><strong>Email:</strong> {profile.emailaddress}</p>
        <p><strong>Phone:</strong> {profile.phonenumber}</p>
        <p><strong>Role:</strong> {roleMap[profile.role] || "Unknown Role"}</p>
      </div>
    </div>
  );
}