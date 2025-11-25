// src/pages/DepartmentsPage.jsx
import React, { useState } from "react";
import { Search, Eye, PenSquare, Trash2, Building2, ChevronDown } from "lucide-react";

const DepartmentsPage = () => {
  const [search, setSearch] = useState("");
  const [deanFilter, setDeanFilter] = useState("All");

  // Mock Departments data (replace with API)
  const [departments] = useState([
    { 
      id: "DPT-001", 
      name: "Computer Science", 
      code: "CS", 
      description: "Department of Computer Science", 
      dean: "Prof. Juan Dela Cruz" 
    },
    { 
      id: "DPT-002", 
      name: "Information Technology", 
      code: "IT", 
      description: "Department of Information Technology", 
      dean: "Prof. Maria Santos" 
    },
    { 
      id: "DPT-003", 
      name: "Data Science", 
      code: "DS", 
      description: "Department of Data Science", 
      dean: "Prof. Jose Rizal" 
    },
    { 
      id: "DPT-004", 
      name: "Software Engineering", 
      code: "SE", 
      description: "Department of Software Engineering", 
      dean: "Prof. Maria Santos" 
    },
  ]);

  // Get unique deans for dropdown
  const deans = ["All", ...new Set(departments.map(d => d.dean))];

  // Filter logic
  const filteredDepartments = departments.filter(
    d =>
      (d.name.toLowerCase().includes(search.toLowerCase()) || 
       d.code.toLowerCase().includes(search.toLowerCase())) &&
      (deanFilter === "All" || d.dean === deanFilter)
  );

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Building2 size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name or Code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm
                focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Dean Filter Dropdown */}
            <div className="relative w-[200px]">
              <select
                value={deanFilter}
                onChange={(e) => setDeanFilter(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                {deans.map((dean, i) => (
                  <option key={i} value={dean}>{dean}</option>
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Code</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Dean</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-red-600">{d.code}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{d.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.dean}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{d.description}</td>
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
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No departments found matching your search.
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

export default DepartmentsPage;
