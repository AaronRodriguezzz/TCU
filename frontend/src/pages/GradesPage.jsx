// src/pages/GradesPage.jsx
import React, { useState } from "react";

const GradesPage = () => {
  const [search, setSearch] = useState("");
  const [students] = useState([
    { id: "2021-001", name: "Juan Dela Cruz", course: "BS Computer Science", year: "3rd Year", grade: "A" },
    { id: "2021-002", name: "Maria Santos", course: "BS Information Technology", year: "2nd Year", grade: "B+" },
    { id: "2021-003", name: "Jose Rizal", course: "BS Computer Engineering", year: "4th Year", grade: "A-" },
    { id: "2021-004", name: "Ana Dela Rosa", course: "BS Data Science", year: "1st Year", grade: "B" },
    { id: "2021-005", name: "Pedro Penduko", course: "BS Information Systems", year: "2nd Year", grade: "C+" },
    { id: "2021-006", name: "Liza Dizon", course: "BS Computer Science", year: "1st Year", grade: "B-" },
    { id: "2021-007", name: "Mark Garcia", course: "BS Software Engineering", year: "3rd Year", grade: "A" },
    { id: "2021-008", name: "Sofia Lopez", course: "BS Data Analytics", year: "4th Year", grade: "B+" },
  ]);

  // Filtered students based on search input
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header with Title + Add Grade Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold font-montserrat tracking-tight">Student Grades</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[400px] px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Student Grades Table */}
      <div className="min-h-[70vh] overflow-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-6 py-3 font-semibold">Student ID</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Course</th>
              <th className="px-6 py-3 font-semibold">Year</th>
              <th className="px-6 py-3 font-semibold">Grade</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr
                  key={student.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-3 text-sm text-gray-600">{student.id}</td>
                  <td className="px-6 py-3 font-medium">{student.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{student.course}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{student.year}</td>
                  <td className="px-6 py-3 font-semibold">{student.grade}</td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button className="px-4 py-1.5 text-sm rounded-full shadow bg-blue-500 text-white hover:bg-blue-600 transition">
                      View
                    </button>
                    <button className="px-4 py-1.5 text-sm rounded-full shadow bg-green-500 text-white hover:bg-green-600 transition">
                      Set Grade
                    </button>
                    <button className="px-4 py-1.5 text-sm rounded-full shadow bg-red-500 text-white hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesPage;
