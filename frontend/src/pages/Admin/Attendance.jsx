// src/pages/AttendancePage.jsx
import React, { useState } from "react";
import { Search, Eye, PenSquare, Trash2, CalendarDays, ChevronDown } from "lucide-react";

const AttendancePage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [attendanceRecords] = useState([
    {
      id: "AT-001",
      studentName: "Juan Dela Cruz",
      studentId: "2021-001",
      className: "Introduction to Computing",
      date: "2024-11-01",
      status: "Present",
    },
    {
      id: "AT-002",
      studentName: "Maria Santos",
      studentId: "2021-002",
      className: "Data Structures",
      date: "2024-11-01",
      status: "Absent",
    },
    {
      id: "AT-003",
      studentName: "Jose Rizal",
      studentId: "2021-003",
      className: "Database Systems",
      date: "2024-11-01",
      status: "Late",
    },
  ]);

  // Filter logic
  const filteredRecords = attendanceRecords.filter(
    (r) =>
      (r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.studentId.toLowerCase().includes(search.toLowerCase()) ||
        r.className.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || r.status === statusFilter)
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
        {/* Page Header */}
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

            {/* Status Filter Dropdown */}
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
              <ChevronDown size={16} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-[180px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm 
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                <option value="All">Subjects</option>
                <option value="Present">Data Structures</option>
                <option value="Absent">Java 1</option>
                <option value="Late">Python</option>
              </select>
              <ChevronDown size={16} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
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
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">#{r.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{r.studentName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.studentId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.className}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <PenSquare size={16} />
                        </button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No attendance records found matching your search.
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
