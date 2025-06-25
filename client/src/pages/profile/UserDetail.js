import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserDetail() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/User/UserProfile/${userid}`)
      .then(res => setUser(res.data))
      .catch(() => setError("User not found."));
  }, [userid]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading user profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
      <p><strong>Email:</strong> {user.emailaddress}</p>
      <p><strong>Phone:</strong> {user.phonenumber}</p>
      <p><strong>Role:</strong> {user.roleName}</p>
    </div>
  );
}