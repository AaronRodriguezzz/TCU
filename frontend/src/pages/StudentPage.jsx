// src/pages/StudentsPage.jsx
import React, { useState } from "react";
import { Edit, Trash2, Plus, Download } from "lucide-react";

const StudentsPage = () => {
  const [students, setStudents] = useState([
    { id: "2021-001", name: "Juan Dela Cruz", course: "BS Computer Science", year: "3rd Year" },
    { id: "2021-002", name: "Maria Santos", course: "BS Information Technology", year: "2nd Year" },
    { id: "2021-003", name: "Jose Rizal", course: "BS Computer Engineering", year: "4th Year" },
    { id: "2021-004", name: "Ana Dela Rosa", course: "BS Data Science", year: "1st Year" },
    { id: "2021-005", name: "Pedro Penduko", course: "BS Information Systems", year: "2nd Year" },
  ]);

  const [search, setSearch] = useState("");

  // Filter students by ID or name
  const filteredStudents = students.filter(
    (student) =>
      student.id.toLowerCase().includes(search.toLowerCase()) ||
      student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Export data as JSON file
  const exportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(students, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "students.json";
    link.click();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>

      {/* Search + Add Student */}
      <div className="flex flex-col bg-white p-4 sm:flex-row sm:items-center shadow gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg px-4 py-2 flex-1 bg-gray-100 shadow focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button className="flex items-center gap-2 px-5 py-2 rounded-full shadow bg-green-500 text-white hover:bg-green-600 transition">
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Table */}
      <div className="h-[70vh] overflow-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-6 py-3 font-semibold">Student ID</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Course</th>
              <th className="px-6 py-3 font-semibold">Year</th>
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
                  <td className="px-6 py-3 text-right space-x-2">
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full shadow bg-blue-500 text-white hover:bg-blue-600 transition">
                      <Edit size={16} />
                      Update
                    </button>
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full shadow bg-red-500 text-white hover:bg-red-600 transition">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-5 py-2 rounded-full shadow bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default StudentsPage;
