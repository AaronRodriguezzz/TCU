import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Phone,
  MapPin,
  GraduationCap,
  Hash,
  Layers,
  Building2,
} from "lucide-react";

import { departmentsData } from "../../data/departments";
import { apiService } from "../../api/apiServices";

const StudentModal = ({ open, mode = "add", initialData = null, onClose, onSaved }) => {
  if (!open) return null;

  const studentAPI = apiService("/api/students");

  // EMPTY FORM
  const emptyForm = {
    studentId: "",
    fullName: "",
    email: "",
    password: "",
    gender: "Male",
    birthDate: "",
    contactNumber: "",
    address: "",
    department: "",
    course: "",
    section: "",
    yearLevel: 1,
    status: "Regular",
  };

  const [form, setForm] = useState(emptyForm);

  // LOAD DATA IN EDIT MODE
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        ...initialData,
        password: "", // never preload password
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData]);

  // HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm({
        ...form,
        department: value,
        course: "",
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    try {
      if (mode === "add") {
        const res = await axios.post("http://localhost:4001/api/students", form);

        if (res.data.success) {
          alert("Student created successfully!");
          onClose();
          window.location.reload();
        }
      }

      if (mode === "edit") {
        const res = await axios.put(
          `http://localhost:4001/api/students/${initialData._id}`,
          form
        );

        if (res.data.success) {
          alert("Student updated successfully!");
          onClose();
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  // FIXED: Now match department by NAME instead of ID
  const selectedDept = departmentsData.departments.find(
    (dept) => dept.name === form.department
  );

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 hover:border-red-400 transition";

  const title = mode === "add" ? "Add New Student" : "Update Student";
  const buttonText = mode === "add" ? "Save Student" : "Update Student";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg overflow-auto max-h-[90vh] animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {title}
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Student ID */}
          {mode !== "edit" && (
            <Input
              label="Student ID"
              name="studentId"
              icon={<Hash size={16} />}
              value={form.studentId}
              onChange={handleChange}
              inputClass={inputClass}
            />
          )}

          {/* Name */}
          <Input
            label="Full Name"
            name="fullName"
            icon={<User size={16} />}
            value={form.fullName}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Email */}
          <Input
            label="Email"
            name="email"
            icon={<Mail size={16} />}
            value={form.email}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">
              <Lock size={16} /> Password
            </label>
            <input
              className={inputClass}
              name="password"
              type="password"
              placeholder={
                mode === "edit" ? "(leave blank to keep current)" : "********"
              }
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
            inputClass={inputClass}
          />

          {/* Birthdate */}
          {mode !== "edit" && (
            <Input
              label="Birth Date"
              name="birthDate"
              type="date"
              icon={<Calendar size={16} />}
              value={form.birthDate}
              onChange={handleChange}
              inputClass={inputClass}
            />
          )}

          {/* Contact */}
          <Input
            label="Contact Number"
            name="contactNumber"
            icon={<Phone size={16} />}
            value={form.contactNumber}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Address */}
          <Input
            label="Address"
            name="address"
            icon={<MapPin size={16} />}
            value={form.address}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Department - FIXED VALUE TO NAME */}
          <Select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={departmentsData.departments.map((d) => ({
              value: d.name, // changed from d.id
              label: d.name,
            }))}
            inputClass={inputClass}
            icon={<Building2 size={16} />}
          />

          {/* Course */}
          <Select
            label="Course"
            name="course"
            value={form.course}
            onChange={handleChange}
            disabled={!form.department}
            options={
              selectedDept
                ? selectedDept.courses.map((c) => ({ value: c, label: c }))
                : []
            }
            inputClass={inputClass}
            icon={<GraduationCap size={16} />}
          />

          {/* Section */}
          <Input
            label="Section"
            name="section"
            icon={<Layers size={16} />}
            value={form.section}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Year Level */}
          <Input
            label="Year Level"
            name="yearLevel"
            type="number"
            min="1"
            max="5"
            value={form.yearLevel}
            onChange={handleChange}
            inputClass={inputClass}
          />

          {/* Status */}
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Regular", "Irregular", "Dropped", "LOA"]}
            inputClass={inputClass}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;

/* ------------------------------
    Reusable Input Component
------------------------------ */
const Input = ({ label, icon, inputClass, ...props }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">
      {icon} {label}
    </label>
    <input className={inputClass} {...props} />
  </div>
);

/* ------------------------------
    Reusable Select Component
------------------------------ */
const Select = ({ label, icon, inputClass, options, ...props }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-600 font-medium flex items-center gap-1">
      {icon} {label}
    </label>
    <select className={inputClass} {...props}>
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  </div>
);
