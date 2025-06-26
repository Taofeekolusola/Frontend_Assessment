import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa";
import { BsBook, BsWallet2, BsCreditCard, BsCalendarEvent } from "react-icons/bs";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8 px-3 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300 animate-fade-in">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-700 text-center mb-4">
          Hello, {user?.firstname || "User"} 👋
        </h1>

        <p className="text-center text-sm sm:text-lg text-gray-700 mb-8 px-3 py-3 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl shadow-sm leading-relaxed">
          🎉 <span className="font-semibold text-blue-700">Welcome back!</span> We’re thrilled to see you again. <br />
          <span className="text-gray-600">Here’s a quick overview of your account details 👇</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-blue-300 hover:ring-2 ring-blue-300 transition duration-300">
            <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              User Profile
            </h2>
            <ul className="space-y-3 text-gray-800 text-sm sm:text-base">
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

          {/* Quick Navigation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-blue-300 hover:ring-2 ring-blue-300 transition duration-300">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🚀 Quick Navigation
            </h2>
            <ul className="space-y-4 text-gray-800 text-sm sm:text-base">
              <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
                <BsBook className="text-blue-500" />
                <Link to="/dashboard/exams" className="hover:underline">View Exams</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
                <BsWallet2 className="text-blue-500" />
                <Link to="/dashboard/my-wallet" className="hover:underline">Check Wallet</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
                <BsCreditCard className="text-blue-500" />
                <Link to="/dashboard/request-card" className="hover:underline">Request Card</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-700 hover:translate-x-1 transition-all duration-200">
                <BsCalendarEvent className="text-blue-500" />
                <Link to="/dashboard/subscriptions" className="hover:underline">Manage Subscriptions</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs sm:text-sm text-gray-400">
          💡 Tip: Use the sidebar to explore more features and tools.
        </div>
      </div>
    </div>
  );
}