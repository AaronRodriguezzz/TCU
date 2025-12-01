import React, { useState, useEffect } from "react";
import axios from "axios";
import { departmentsData } from "../../data/departments";

const ProfessorModal = ({ open, mode = "add", initialData = null, onClose, onSaved }) => {
  if (!open) return null;

  const emptyForm = {
    role: "Professor",
    profile: {
      fullName: "",
      email: "",
      password: "",
      employeeId: "",
      department: "",
      contactNumber: "",
    },
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...initialData,
        profile: {
          ...initialData.profile,
          password: "", // do not preload password
        },
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData]);

  const handleChange = (e, nested = false) => {
    const { name, value } = e.target;
    if (nested) {
      setForm({ ...form, profile: { ...form.profile, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      let response = null;
      if (mode === "add") {
        response = await axios.post("http://localhost:4001/api/professors", form);
      } else if (mode === "edit") {
        response = await axios.put(`http://localhost:4001/api/professors/${initialData._id}`, form);
      }

      if (response.data.success) {
        alert("Professor data saved!");
        onClose();
        window.location.reload();
      }

    } catch (err) {
      console.error(err);
      alert("Failed to save professor");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 hover:border-red-400 transition";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg overflow-auto max-h-[90vh] animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {mode === "add" ? "Add New Professor" : "Update Professor"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Full Name</label>
            <input
              className={inputClass}
              name="fullName"
              value={form.profile.fullName}
              onChange={(e) => handleChange(e, true)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              className={inputClass}
              name="email"
              value={form.profile.email}
              onChange={(e) => handleChange(e, true)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              className={inputClass}
              type="password"
              placeholder={mode === "edit" ? "(leave blank to keep current)" : ""}
              name="password"
              onChange={(e) => handleChange(e, true)}
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Employee ID</label>
            <input
              className={inputClass}
              name="employeeId"
              value={form.profile.employeeId}
              onChange={(e) => handleChange(e, true)}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Department</label>
            <select
              className={inputClass}
              name="department"
              value={form.profile.department}
              onChange={(e) => handleChange(e, true)}
            >
              <option value="">Select Department</option>
              {departmentsData.departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Contact Number</label>
            <input
              className={inputClass}
              name="contactNumber"
              value={form.profile.contactNumber}
              onChange={(e) => handleChange(e, true)}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Status</label>
            <select
              className={inputClass}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            {mode === "add" ? "Save Professor" : "Update Professor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorModal;
