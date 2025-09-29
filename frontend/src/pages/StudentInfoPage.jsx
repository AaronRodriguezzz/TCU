// src/pages/StudentViewPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentViewPage = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  // Mock student data (in real app, fetch from API)
  const student = {
    id,
    name: "Juan Dela Cruz",
    course: "BS Computer Science",
    year: "3rd Year",
    email: "juan.delacruz@university.edu",
    contact: "0917-123-4567",
  };

  // Mock stats/grades
  const stats = [
    { subject: "Data Structures", grade: "A", semester: "1st Sem 2024" },
    { subject: "Web Development", grade: "B+", semester: "1st Sem 2024" },
    { subject: "Algorithms", grade: "A-", semester: "2nd Sem 2024" },
    { subject: "Operating Systems", grade: "B", semester: "2nd Sem 2024" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full shadow bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          ← Back
        </button>
      </div>

      {/* Student Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Student ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Year Level:</strong> {student.year}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Contact:</strong> {student.contact}</p>
        </div>
      </div>

      {/* Student Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Academic Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-6 py-3 font-semibold">Subject</th>
                <th className="px-6 py-3 font-semibold">Grade</th>
                <th className="px-6 py-3 font-semibold">Semester</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-3">{stat.subject}</td>
                  <td className="px-6 py-3 font-medium">{stat.grade}</td>
                  <td className="px-6 py-3 text-gray-600">{stat.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentViewPage;
