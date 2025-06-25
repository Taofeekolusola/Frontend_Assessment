import { FaUser, FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa";
import { BsBook, BsWallet2, BsCreditCard, BsCalendarEvent } from "react-icons/bs";
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-2">
          Hello, {user?.firstname || "User"} 👋
        </h1>
        <p className="text-center text-lg text-gray-700 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl shadow-sm">
  🎉 <span className="font-medium text-blue-700">Welcome back!</span> We're glad to have you. <br />
  <span className="text-gray-600">Here's a quick overview of your account details 👇</span>
</p>

<div className="grid md:grid-cols-2 gap-6">
  {/* Profile Card */}
  <div className="bg-blue-50 rounded-xl p-6 shadow-md hover:shadow-blue-300 hover:ring-2 ring-blue-300 transition duration-300">
    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
      <FaUser className="text-blue-500" />
      User Profile
    </h2>
    <ul className="space-y-3 text-gray-700">
      <li className="flex items-center gap-2">
        <FaUser className="text-blue-400" />
        <span><strong>Full Name:</strong> {user?.firstname} {user?.middlename} {user?.lastname}</span>
      </li>
      <li className="flex items-center gap-2">
        <FaEnvelope className="text-blue-400" />
        <span><strong>Email:</strong> {user?.emailaddress}</span>
      </li>
      <li className="flex items-center gap-2">
        <FaPhone className="text-blue-400" />
        <span><strong>Phone:</strong> {user?.phonenumber}</span>
      </li>
      <li className="flex items-center gap-2">
        <FaUserShield className="text-blue-400" />
        <span><strong>Role:</strong> {user?.roleName || user?.role || "N/A"}</span>
      </li>
    </ul>
  </div>

  {/* Quick Navigation Card */}
  <div className="bg-white border rounded-xl p-6 shadow-md hover:shadow-blue-300 hover:ring-2 ring-blue-300 transition duration-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      🚀 Quick Navigation
    </h2>
    <ul className="space-y-4 text-gray-700">
      <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
        <BsBook className="text-blue-500" />
        <a href="/exams" className="hover:underline">View Exams</a>
      </li>
      <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
        <BsWallet2 className="text-blue-500" />
        <a href="/my-wallet" className="hover:underline">Check Wallet</a>
      </li>
      <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
        <BsCreditCard className="text-blue-500" />
        <a href="/request-card" className="hover:underline">Request Card</a>
      </li>
      <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
        <BsCalendarEvent className="text-blue-500" />
        <a href="/subscriptions" className="hover:underline">Manage Subscriptions</a>
      </li>
    </ul>
  </div>
</div>


        <div className="mt-10 text-center text-sm text-gray-400">
          🚀 Tip: Use the sidebar to access more features anytime.
        </div>
      </div>
    </div>
  );
}