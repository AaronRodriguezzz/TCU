import React, { useState } from "react";
import { Search, Eye, PenSquare, Trash2, BookOpen, ChevronDown } from "lucide-react";

const ClassesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // New state for dropdown

  const [classes] = useState([
    {
      id: "CL-001",
      subject: "Introduction to Computing",
      professor: "Prof. Juan Dela Cruz",
      sectionName: "BSCS 1A",
      schoolYear: "2024-2025",
      semester: "1st",
      status: "On-Going",
      schedule: [
        { day: "Mon", timeStart: "8:00 AM", timeEnd: "9:30 AM" },
        { day: "Wed", timeStart: "8:00 AM", timeEnd: "9:30 AM" },
      ],
      enrolledCount: 35,
    },
    {
      id: "CL-002",
      subject: "Data Structures",
      professor: "Prof. Maria Santos",
      sectionName: "BSIT 2B",
      schoolYear: "2024-2025",
      semester: "2nd",
      status: "Completed",
      schedule: [{ day: "Tue", timeStart: "1:00 PM", timeEnd: "3:00 PM" }],
      enrolledCount: 40,
    },
    {
      id: "CL-003",
      subject: "Database Systems",
      professor: "Prof. Jose Rizal",
      sectionName: "BSCS 3C",
      schoolYear: "2023-2024",
      semester: "1st",
      status: "On-Going",
      schedule: [
        { day: "Thu", timeStart: "10:00 AM", timeEnd: "12:00 PM" },
        { day: "Fri", timeStart: "10:00 AM", timeEnd: "12:00 PM" },
      ],
      enrolledCount: 28,
    },
  ]);

  // Filter logic (search + status)
  const filteredClasses = classes.filter(
    (c) =>
      (c.subject.toLowerCase().includes(search.toLowerCase()) ||
        c.professor.toLowerCase().includes(search.toLowerCase()) ||
        c.sectionName.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || c.status === statusFilter)
  );

  const statusColor = (status) =>
    status === "On-Going" ? "text-green-700 bg-green-100" : "text-gray-700 bg-gray-200";

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <BookOpen size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Class ID, Subject, Professor, Section..."
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
                <option value="On-Going">On-Going</option>
                <option value="Completed">Completed</option>
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Class ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Professor</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Section</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Schedule</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">#{c.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{c.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{c.professor}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{c.sectionName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {c.schedule.map((s, i) => (
                          <div key={i}>
                            {s.day} • {s.timeStart} - {s.timeEnd}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                            c.status
                          )}`}
                        >
                          {c.status}
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
                      No classes found matching your search.
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

export default ClassesPage;
