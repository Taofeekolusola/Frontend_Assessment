// src/pages/Dashboard.jsx
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstname || "User"}!</h1>
    </div>
  );
}