import React, { useState, useEffect } from "react";
import axios from "axios";

const AnnouncementModal = ({ open, mode = "add", initialData = null, onClose, onSaved }) => {
  if (!open) return null;

  const emptyForm = {
    title: "",
    content: "",
    author: "",
    startDate: "",
    endDate: "",
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let response;

      if (mode === "add") {
        response = await axios.post("http://localhost:4001/api/announcements", form);
      } else if (mode === "edit") {
        response = await axios.put(`http://localhost:4001/api/announcements/${initialData._id}`, form);
      }

      // Check if backend returned the announcement object
      const savedAnnouncement = response.data;
      if (savedAnnouncement) {
        alert("Announcement saved!");
        onClose();
        window.location.reload();
      }

    } catch (err) {
      console.error(err);
      alert("Failed to save announcement");
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "add" ? "Add Announcement" : "Update Announcement"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Title</label>
            <input className={inputClass} name="title" value={form.title} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Content</label>
            <textarea className={inputClass} name="content" value={form.content} onChange={handleChange} rows={4} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Author</label>
            <input className={inputClass} name="author" value={form.author} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Start Date</label>
            <input className={inputClass} type="date" name="startDate" value={form.startDate?.split("T")[0]} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">End Date</label>
            <input className={inputClass} type="date" name="endDate" value={form.endDate?.split("T")[0]} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Status</label>
            <select className={inputClass} name="status" value={form.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
