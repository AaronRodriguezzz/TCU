// src/pages/StudentsPage.jsx
import React, { useState } from "react";
import { 
  Edit, 
  Plus, 
  Download, 
  Search, 
  Users,
  GraduationCap,
  Eye
} from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import AddStudentModal from "../../components/modal/StudentModal"; // now flexible
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const StudentsPage = () => {
  const navigate = useNavigate();

  const { response, loading, error, refetch } = useFetch("/students");

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Students list
  const students = Array.isArray(response?.data?.students)
    ? response.data.students
    : [];

  // Filter Search
  const filteredStudents = students.filter((student) =>
    student.studentId.toLowerCase().includes(search.toLowerCase()) ||
    student.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // Export JSON File
  const exportData = () => {
    if (!students || students.length === 0) return;

    // Map students for Excel (headers nicely formatted)
    const worksheetData = filteredStudents.map((s) => ({
      "Student ID": s.studentId,
      "Full Name": s.fullName,
      "Course": s.course,
      "Year Level": s.yearLevel,
      "Status": s.status,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { origin: "A1" });

    // Auto-width for columns
    const columnWidths = Object.keys(worksheetData[0]).map((key) => ({
      wch: Math.max(...worksheetData.map((row) => row[key]?.toString().length)) + 5,
    }));
    worksheet["!cols"] = columnWidths;

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Write workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "students.xlsx");
  };


  // Open Add Student Modal
  const openAddModal = () => {
    setModalMode("add");
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  // Open Edit Student Modal
  const openEditModal = (student) => {
    setModalMode("edit");
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // After Save event
  const handleModalSave = () => {
    setIsModalOpen(false);
    refetch(); // refresh list
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

          <div className="flex items-center gap-3">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-100 rounded-lg transition"
            >
              <Download size={18} />
              Export Data
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-red-300 focus:ring-2 focus:ring-red-100 transition"
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
                        <GraduationCap size={14} /> Course
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Year</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-red-600 font-medium">
                        #{student.studentId}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              student.fullName
                            )}&background=dc2626&color=fff&bold=true`}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-gray-900 font-medium">
                            {student.fullName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{student.course}</td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                          {student.yearLevel}
                          {student.yearLevel === 1
                            ? "st"
                            : student.yearLevel === 2
                            ? "nd"
                            : student.yearLevel === 3
                            ? "rd"
                            : "th"}{" "}
                          Year
                        </span>
                      </td>

                      <td
                        className="px-6 py-4 font-medium"
                        style={{
                          color:
                            student.status === "Regular"
                              ? "green"
                              : student.status === "Irregular"
                              ? "orange"
                              : "red",
                        }}
                      >
                        {student.status}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">

                          {/* View */}
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => navigate(`/student/${student._id}`)}
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => openEditModal(student)}
                          >
                            <Edit size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            )}
          </div>
        </div>
      </div>

      {/* Flexible Add/Edit Modal */}
      <AddStudentModal
        open={isModalOpen}
        mode={modalMode}
        initialData={selectedStudent}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default StudentsPage;
