// src/pages/AttendancePage.jsx
import React, { useState, useEffect } from "react";
import { Search, Eye, PenSquare, Trash2, CalendarDays, ChevronDown } from "lucide-react";
import { useFetch } from "../../hooks/fetchData";

const AttendancePage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Get logged-in professor
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const professorId = loggedUser?._id;

  // Fetch professor classes
  const { response: classesResponse, loading: classesLoading } = useFetch(
    professorId ? `/class/prof/${professorId}` : null
  );

  console.log(classesResponse);
  const classList = classesResponse?.classes || [];

  // Automatically select first class
  useEffect(() => {
    if (classList.length > 0 && selectedSubject === "All") {
      setSelectedSubject(classList[0].subject.subjectName);
    }
  }, [classList]);

  // Fetch students based on selected subject
  const { response: studentsResponse, loading: studentsLoading, error: studentsError } = useFetch(
    selectedSubject !== "All" ? `/students?className=${selectedSubject}` : null,
    null,
    null,
    [selectedSubject]
  );
  const studentsList = studentsResponse || [];

  // Example attendance records (can later map studentsResponse to create real attendance)
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: "AT-001",
      studentName: "Juan Dela Cruz",
      studentId: "2021-001",
      className: "Introduction to Computing",
      date: "2024-11-01",
      status: "Present",
    },
  ]);

  // Filter logic
  const filteredRecords = attendanceRecords.filter(
    (r) =>
      (r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.studentId.toLowerCase().includes(search.toLowerCase()) ||
        r.className.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || r.status === statusFilter) &&
      (selectedSubject === "All" || r.className === selectedSubject)
  );

  const statusColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-700 bg-green-100";
      case "Absent":
        return "text-red-700 bg-red-100";
      case "Late":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-200";
    }
  };

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <CalendarDays size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Student ID, Name, Class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm 
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="relative w-[180px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm 
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                <option value="All">All Statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
              <ChevronDown size={16} className="absolute right-2 top-2.5 text-gray-400" />
            </div>

            {/* SUBJECT DROPDOWN (DYNAMIC) */}
            <div className="relative w-[200px]">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm 
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                {classesLoading ? (
                  <option>Loading classes...</option>
                ) : classList.length > 0 ? (
                  classList.map((c) => (
                    <option key={c._id} value={c.subject.subjectName}>
                      {c.subject.subjectName}
                    </option>
                  ))
                ) : (
                  <option disabled>No classes found</option>
                )}
              </select>
              <ChevronDown size={16} className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* STUDENT LIST */}
        {selectedSubject !== "All" && (
          <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3">
              Students Enrolled in: <span className="text-red-600">{selectedSubject}</span>
            </h2>

            {studentsLoading ? (
              <p className="text-gray-500 text-sm">Loading students...</p>
            ) : studentsError ? (
              <p className="text-red-500 text-sm">{studentsError}</p>
            ) : studentsList.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-700">
                {studentsList.map((s) => (
                  <li key={s._id}>
                    {s.fullName} — {s.studentId}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No students found for this subject.</p>
            )}
          </div>
        )}

        {/* ATTENDANCE TABLE */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Record ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Class</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        <span className="font-semibold text-red-600">#{r.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{r.studentName}</td>
                      <td className="px-6 py-4">{r.studentId}</td>
                      <td className="px-6 py-4">{r.className}</td>
                      <td className="px-6 py-4">{r.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(r.status)}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="w-8 h-8 rounded-lg hover:text-red-600 hover:bg-red-50">
                          <Eye size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:text-red-600 hover:bg-red-50">
                          <PenSquare size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:text-red-600 hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No attendance records found.
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

export default AttendancePage;
