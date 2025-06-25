// src/pages/Dashboard.jsx
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome, {user?.firstname || "User"}! 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          You're logged in as <strong>{user?.emailaddress || "guest@example.com"}</strong>.
          <br />
          Explore the platform using the sidebar to access features like exams, wallet, card requests, and more.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Your Details</h2>
          <ul className="text-left text-gray-800 space-y-1">
            <li><strong>Full Name:</strong> {user?.firstname} {user?.middlename} {user?.lastname}</li>
            <li><strong>Email:</strong> {user?.emailaddress}</li>
            <li><strong>Phone:</strong> {user?.phonenumber}</li>
            <li><strong>Role:</strong> {user?.roleName || user?.role || "N/A"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}