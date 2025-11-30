import React, { useState } from "react";
import { Search, Eye, PenSquare, UserPlus , BookOpen, ChevronDown, Plus} from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import AddClassSectionModal from "../../components/modal/NewClass"
import StudentSelectorModal from "../../components/modal/AssignStudent";

const ClassesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [assigningOpen, setAssigningOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  const { response, loading, error } = useFetch("/class");

  const classes = Array.isArray(response?.data.classes) ? response.data.classes : [];
  

  const statusColor = (status) =>
    status === "On-Going" ? "text-green-700 bg-green-100" : "text-gray-700 bg-gray-200";

  if (loading) return <div className="p-6 text-center">Loading Class data...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error.message}</div>;
  if (!response) return <div className="p-6 text-center">No Class data found.</div>

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

            <button 
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              <Plus size={18} />
              Add Class
            </button>          
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Class Code</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Units</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">School Year / Sem</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Schedule</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.length > 0 ? (
                  classes.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50/50 transition-colors">

                      {/* CLASS ID */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">{c.subject?.subjectCode}</span>
                      </td>

                      {/* SUBJECT NAME */}
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {c.subject?.subjectName || "N/A"}
                      </td>

                      {/* UNITS */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {c.subject?.units} unit(s)
                      </td>

                      {/* SCHOOL YEAR + SEMESTER */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {c.schoolYear} • {c.semester}
                      </td>

                      {/* SCHEDULE */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {c.schedule?.map((s, i) => (
                          <div key={i}>
                            {s.day} • {s.timeStart} - {s.timeEnd}
                          </div>
                        ))}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            c.status === "On-Going"
                              ? "text-green-700 bg-green-100"
                              : "text-gray-700 bg-gray-200"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* ACTION BUTTONS */}
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Eye size={16} />
                        </button>

                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <PenSquare size={16} />
                        </button>

                        <button 
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setAssigningOpen(true);
                            setSelectedClass(c._id);
                          }}
                        >
                          <UserPlus  size={16} />
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

      <AddClassSectionModal 
        open={open}
        onClose={() => setOpen(false)}
      />

      <StudentSelectorModal
        open={assigningOpen}
        classId={selectedClass}
        onClose={() => setAssigningOpen(false)}
        onSave={() => setAssigningOpen(false)}
      />
    </div>
  );
};

export default ClassesPage;
