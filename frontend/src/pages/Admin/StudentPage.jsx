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
import { useFetch } from "../../hooks/fetchData";
import AddStudentModal from "../../components/modal/NewStudent";
import { useNavigate } from "react-router-dom";

const StudentsPage = () => {
  const navigate = useNavigate();
  
  const { response, loading, error } = useFetch("/students");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const students = Array.isArray(response?.data?.students) ? response.data.students : [];

  const filteredStudents = students.filter(
    (student) =>
      student.studentId.toLowerCase().includes(search.toLowerCase()) ||
      student.fullName.toLowerCase().includes(search.toLowerCase())
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
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
            {loading ? (
              <p className="p-4 text-center text-gray-500">Loading students...</p>
            ) : error ? (
              <p className="p-4 text-center text-red-600">{error}</p>
            ) : (
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
                      <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-red-600">#{student.studentId}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=dc2626&color=ffffff&bold=true`}
                              alt={student.fullName}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium text-gray-900">{student.fullName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{student.course}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                            {student.yearLevel} {student.yearLevel === 1 ? "st" : student.yearLevel === 2 ? "nd" : student.yearLevel === 3 ? "rd" : "th"} Year
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              onClick={() => navigate(`/student/${student._id}`)}
                            >
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
            )}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StudentsPage;
