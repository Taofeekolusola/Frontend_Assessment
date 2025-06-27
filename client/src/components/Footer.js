// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4 mt-auto shadow-inner">
      <p>&copy; {new Date().getFullYear()} EduExamPro. All rights reserved.</p>
    </footer>
  );
}