import React, { useState } from "react";
import { apiService } from "../../api/apiServices";
import axios from "axios";
import { User, Mail, Lock, Calendar, Phone, MapPin, GraduationCap, Hash, Layers } from "lucide-react";

const AddStudentModal = ({ open, onClose, onSave }) => {
  if (!open) return null;

  const studentAPI = apiService("/api/students");

  const [form, setForm] = useState({
    studentId: "",
    fullName: "",
    email: "",
    password: "",
    gender: "Male",
    birthDate: "",
    contactNumber: "",
    address: "",
    course: "",
    section: "",
    yearLevel: 1,
    status: "Regular",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log('1')
    try {
      const newStudent = await axios.post("http://localhost:4001/api/students", form);

      if (newStudent.success) {
        window.location.reload();
      }
      onClose();
    } catch (err) {
      console.error("Create student error:", err);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 hover:border-red-400 transition";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg overflow-auto max-h-[90vh] animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Student</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Hash size={16}/> Student ID</label>
            <input className={inputClass} name="studentId" placeholder="e.g., 2025-001" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><User size={16}/> Full Name</label>
            <input className={inputClass} name="fullName" placeholder="e.g., Juan Dela Cruz" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Mail size={16}/> Email</label>
            <input className={inputClass} name="email" placeholder="example@mail.com" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Lock size={16}/> Password</label>
            <input className={inputClass} name="password" type="password" placeholder="********" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">Gender</label>
            <select className={inputClass} name="gender" onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Calendar size={16}/> Birth Date</label>
            <input className={inputClass} name="birthDate" type="date" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Phone size={16}/> Contact Number</label>
            <input className={inputClass} name="contactNumber" placeholder="09xxxxxxxxx" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><MapPin size={16}/> Address</label>
            <input className={inputClass} name="address" placeholder="Address" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><GraduationCap size={16}/> Course</label>
            <input className={inputClass} name="course" placeholder="BS Computer Science" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1"><Layers size={16}/> Section</label>
            <input className={inputClass} name="section" placeholder="Section" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">Year Level</label>
            <input className={inputClass} name="yearLevel" type="number" min="1" max="5" onChange={handleChange} />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">Status</label>
            <select className={inputClass} name="status" onChange={handleChange}>
              <option>Regular</option>
              <option>Irregular</option>
              <option>Dropped</option>
              <option>LOA</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Save Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
