import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hash, BookOpen, Layers, Calendar, Clock, Plus, Trash } from "lucide-react";

const AddClassSectionModal = ({ open, onClose, onSave, classData }) => {
  if (!open) return null;

  const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));

  const schoolYears = ["2024-2025", "2025-2026", "2026-2027", "2027-2028"];
  const semesters = ["1st", "2nd"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeOptions = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const [form, setForm] = useState({
    subject: {
      subjectCode: "",
      subjectName: "",
      units: "",
    },
    schoolYear: "",
    semester: "",
    schedule: [],
    status: "On-Going",
    professor: admin._id,
  });

  const [scheduleInput, setScheduleInput] = useState({
    day: "",
    timeStart: "",
    hours: "",
  });

  // Populate form if classData exists (update mode)
  useEffect(() => {
    if (classData) {
      setForm({
        ...classData,
        professor: classData.professor || admin._id,
      });
    }
  }, [classData]);

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 hover:border-red-400 transition";
  const labelClass = "mb-1 text-gray-600 font-medium flex items-center gap-1";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("subject.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        subject: { ...prev.subject, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleScheduleChange = (e) => {
    setScheduleInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addSchedule = () => {
    const { day, timeStart, hours } = scheduleInput;
    if (!day || !timeStart || !hours)
      return alert("Please complete all schedule fields.");

    const hourNum = Number(hours);
    if (hourNum < 3 || hourNum > 6)
      return alert("Class duration must be between 3 to 6 hours.");

    const start = Number(timeStart);
    const end = start + hourNum;

    const newSchedule = {
      day,
      timeStart: `${start}:00`,
      timeEnd: `${end}:00`,
    };

    setForm((prev) => ({
      ...prev,
      schedule: [...prev.schedule, newSchedule],
    }));

    setScheduleInput({ day: "", timeStart: "", hours: "" });
  };

  const removeSchedule = (index) => {
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = classData
        ? `http://localhost:4001/api/class/${classData._id}`
        : "http://localhost:4001/api/class";
      const method = classData ? axios.put : axios.post;

      const res = await method(url, form);

      if (res.data.success) {
        alert(`Class ${classData ? "updated" : "created"} successfully!`);
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error("Class submit error:", err);
      alert("Failed to save class. Check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl overflow-auto max-h-[90vh]">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {classData ? "Update Class Section" : "Add Class Section"}
        </h2>

        {/* SUBJECT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Subject Code", icon: <Hash size={16} />, name: "subject.subjectCode" },
            { label: "Subject Name", icon: <BookOpen size={16} />, name: "subject.subjectName" },
            { label: "Units", icon: <Layers size={16} />, name: "subject.units", type: "number", min: 2, max: 3 },
          ].map((field, i) => (
            <div key={i} className="flex flex-col">
              <label className={labelClass}>{field.icon} {field.label}</label>
              <input
                className={inputClass}
                name={field.name}
                type={field.type || "text"}
                min={field.min}
                max={field.max}
                value={field.name.startsWith("subject.") ? form.subject[field.name.split(".")[1]] : form[field.name]}
                onChange={handleFormChange}
              />
            </div>
          ))}

          {/* School Year */}
          <div className="flex flex-col">
            <label className={labelClass}><Calendar size={16}/> School Year</label>
            <select className={inputClass} name="schoolYear" value={form.schoolYear} onChange={handleFormChange}>
              <option value="">Select</option>
              {schoolYears.map((sy, i) => <option key={i} value={sy}>{sy}</option>)}
            </select>
          </div>

          {/* Semester */}
          <div className="flex flex-col">
            <label className={labelClass}><Calendar size={16}/> Semester</label>
            <select className={inputClass} name="semester" value={form.semester} onChange={handleFormChange}>
              <option value="">Select</option>
              {semesters.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* SCHEDULE */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Schedule</h3>
        <div className="grid grid-cols-3 gap-4 items-end">
          {/* Day */}
          <div className="flex flex-col">
            <label className={labelClass}>Day</label>
            <select name="day" className={inputClass} value={scheduleInput.day} onChange={handleScheduleChange}>
              <option value="">Select</option>
              {days.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Time Start */}
          <div className="flex flex-col">
            <label className={labelClass}><Clock size={16}/> Time Start</label>
            <select name="timeStart" className={inputClass} value={scheduleInput.timeStart} onChange={handleScheduleChange}>
              <option value="">Select</option>
              {timeOptions.map((t, i) => <option key={i} value={t}>{`${t}:00`}</option>)}
            </select>
          </div>

          {/* Hours */}
          <div className="flex flex-col">
            <label className={labelClass}><Clock size={16}/> Hours</label>
            <input type="number" name="hours" min="3" max="6" className={inputClass} value={scheduleInput.hours} onChange={handleScheduleChange}/>
          </div>
        </div>

        <button onClick={addSchedule} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18}/> Add Schedule
        </button>

        {/* DISPLAY SCHEDULES */}
        <div className="mt-4 space-y-2">
          {form.schedule.map((s, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span>{s.day} | {s.timeStart} - {s.timeEnd}</span>
              <button onClick={() => removeSchedule(i)} className="text-red-500 hover:text-red-700">
                <Trash size={18}/>
              </button>
            </div>
          ))}
        </div>

        {/* STATUS */}
        <div className="mt-6">
          <label className={labelClass}>Status</label>
          <select className={inputClass} name="status" value={form.status} onChange={handleFormChange}>
            <option value="On-Going">On-Going</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-6 gap-3">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            {classData ? "Update Class" : "Save Class"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddClassSectionModal;
