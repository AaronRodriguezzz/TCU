// src/pages/StudentsPage.jsx
import React, { useState } from "react";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Download, 
  Search, 
  Users,
  GraduationCap,
  Eye
} from "lucide-react";

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
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-100 rounded-lg transition-colors duration-200"
            >
              <Download size={18} />
              Export Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200">
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-colors duration-200"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} />
                      Course
                    </div>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-red-600">#{student.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=dc2626&color=ffffff&bold=true`}
                            alt={student.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{student.course}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                          {student.year}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No students found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
