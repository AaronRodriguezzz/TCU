import React, { useState, useEffect } from "react";
import { Search, Eye, PenSquare, Trash2, Bell, ChevronDown, Plus } from "lucide-react";
import AnnouncementModal from "../../components/modal/AnnouncementModal";
import { useFetch } from "../../hooks/fetchData";
import axios from "axios";

const AnnouncementsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Fetch announcements from backend
  const { response, loading, error, setResponse } = useFetch("/announcements");

  // Local announcements state for search/filter
  const [announcements, setAnnouncements] = useState([]);

  // Sync fetched data to local state
  useEffect(() => {
    if (response?.success) setAnnouncements(response.data);
  }, [response]);

  // Unique types for filter dropdown
  const types = ["All", ...new Set(announcements.map(a => a.type))];

  const filtered = announcements.filter(
    a =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || a.type === typeFilter)
  );

  const handleAdd = () => {
    setModalMode("add");
    setSelectedAnnouncement(null);
    setModalOpen(true);
  };

  const handleEdit = (announcement) => {
    setModalMode("edit");
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await axios.delete(`http://localhost:4001/api/announcements/${id}`);
      setAnnouncements(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement");
    }
  };

  const handleSaved = (savedAnnouncement) => {
    if (modalMode === "add") {
      setAnnouncements(prev => [...prev, savedAnnouncement]);
    } else {
      setAnnouncements(prev =>
        prev.map(a => (a._id === savedAnnouncement._id ? savedAnnouncement : a))
      );
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Bell size={32} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[250px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Type filter */}
            <div className="relative w-[180px]">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none w-full py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
              >
                {types.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Add Announcement Button */}
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Plus size={16} /> Add Announcement
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filtered.length > 0 ? (
                  filtered.map(a => (
                    <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{a.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{a.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{a.status}</td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><Eye size={16} /></button>
                        <button onClick={() => handleEdit(a)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><PenSquare size={16} /></button>
                        <button onClick={() => handleDelete(a._id)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                          text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No announcements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcement Modal */}
        <AnnouncementModal
          open={modalOpen}
          mode={modalMode}
          initialData={selectedAnnouncement}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
