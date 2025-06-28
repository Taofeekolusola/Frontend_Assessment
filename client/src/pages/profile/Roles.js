import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllRoles() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/Role/Roles")
      .then((res) => {
        const roleList = res?.data?.data;
        if (Array.isArray(roleList)) {
          setRoles(roleList);
        } else {
          setError("Invalid response format.");
        }
      })
      .catch(() => setError("Failed to fetch roles."));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Roles</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {roles.map((role) => (
          <li key={role.roleID} className="p-2 border rounded">{role.roleName}</li>
        ))}
      </ul>
    </div>
  );
}