import React, { useState } from "react";
import { Users, Plus, Download, Search, Edit, Eye, Trash2 } from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import ProfessorModal from "../../components/modal/ProfessorModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ProfessorsPage = () => {
  const { response, loading, error, refetch } = useFetch("/professors");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const professors = Array.isArray(response?.data) ? response.data : [];

  const filtered = professors.filter(
    (prof) =>
      prof.profile.fullName.toLowerCase().includes(search.toLowerCase()) ||
      prof.profile.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  const exportData = () => {
    if (!professors || professors.length === 0) return;

    // Prepare data for Excel
    const worksheetData = filtered.map((prof) => ({
      "Employee ID": prof.profile.employeeId,
      "Full Name": prof.profile.fullName,
      "Department": prof.profile.department,
      "Status": prof.status,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { origin: "A1" });

    // Auto-width columns
    const columnWidths = Object.keys(worksheetData[0]).map((key) => ({
      wch: Math.max(...worksheetData.map((row) => row[key]?.toString().length)) + 5,
    }));
    worksheet["!cols"] = columnWidths;

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Professors");

    // Export Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "professors.xlsx");
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedProfessor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prof) => {
    setModalMode("edit");
    setSelectedProfessor(prof);
    setIsModalOpen(true);
  };  

  const handleModalSave = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Professor Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={exportData} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-100 rounded-lg">
              <Download size={18} /> Export Data
            </button>

            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Plus size={18} /> Add Professor
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by Name or Employee ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-red-300 focus:ring-2 focus:ring-red-100 transition"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-4 text-center text-gray-500">Loading professors...</p>
            ) : error ? (
              <p className="p-4 text-center text-red-600">{error}</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Employee ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Department</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((prof) => (
                    <tr key={prof._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-red-600 font-medium">{prof.profile.employeeId}</td>
                      <td className="px-6 py-4">{prof.profile.fullName}</td>
                      <td className="px-6 py-4">{prof.profile.department}</td>
                      <td className="px-6 py-4">{prof.status}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-1">
                        <button onClick={() => openEditModal(prof)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No professors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ProfessorModal
        open={isModalOpen}
        mode={modalMode}
        initialData={selectedProfessor}
        onClose={() => setIsModalOpen(false)}
        onSaved={handleModalSave}
      />
    </div>
  );
};

export default ProfessorsPage;
