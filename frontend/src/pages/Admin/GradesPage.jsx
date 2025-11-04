// src/pages/GradesPage.jsx
import React, { useState } from "react";
import { Search, Eye, PenSquare, Trash2, GraduationCap } from "lucide-react";

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

  const getGradeColor = (grade) => {
    const firstChar = grade.charAt(0);
    switch(firstChar) {
      case 'A': return 'text-green-600 bg-green-50';
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6 bg-gray-50/50">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <GraduationCap size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Student Grades</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Student Grades Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Course</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Grade</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="font-medium text-red-600">#{student.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">{student.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.year}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(student.grade)}`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <PenSquare size={16} />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
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

export default GradesPage;
