import React, { useState } from "react";
import { Search, Eye, PenSquare, Trash2, FileText, ChevronDown } from "lucide-react";

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All"); // e.g., Syllabus, Forms

  const [documents] = useState([
    { id: "DOC-001", title: "CS Syllabus", category: "Syllabus", uploadDate: "2024-10-01" },
    { id: "DOC-002", title: "Leave Form", category: "Forms", uploadDate: "2024-09-15" },
    { id: "DOC-003", title: "IT Syllabus", category: "Syllabus", uploadDate: "2024-10-05" },
  ]);

  const categories = ["All", ...new Set(documents.map(d => d.category))];

  const filtered = documents.filter(
    d =>
      d.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "All" || d.category === categoryFilter)
  );

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <FileText size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="relative w-[180px]">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Upload Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered.length > 0 ? (
                  filtered.map(d => (
                    <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">{d.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{d.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.uploadDate}</td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><Eye size={16} /></button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><PenSquare size={16} /></button>
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No documents found.
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

export default DocumentsPage;
