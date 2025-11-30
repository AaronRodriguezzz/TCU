import React, { useEffect, useState, useMemo } from "react";
import { Search, User, XCircle } from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import axios from "axios";

const AssignStudentModal = ({ open, onClose, onSave, classId }) => {
  if (!open || !classId) return null;

  const { response, loading, error } = useFetch(`/students/unenrolled/${classId}`);
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Memoize students so it doesn't recreate every render
  const students = useMemo(() => {
    return Array.isArray(response?.data) ? response.data : [];
  }, [response?.data]);

  // Filter students based on search input
  useEffect(() => {
    const s = search.toLowerCase();
    const f = students.filter(
      (st) =>
        (st.fullName ?? "").toLowerCase().includes(s) ||
        (st.studentId ?? "").toLowerCase().includes(s)
    );
    setFiltered(f);
  }, [search, students]); // now safe, students only changes when response.data changes

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(prev => prev.filter(sid => sid !== id));
    } else {
      setSelectedStudents(prev => [...prev, id]);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`http://localhost:4001/api/class/${classId}/enroll`, selectedStudents);
      if (res.data.success) {
        alert("Students added successfully");
        onSave?.();
      }
      onClose();
    } catch (err) {
      console.error("Enroll students error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-xl max-h-[90vh] overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Students to Class</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <XCircle size={30} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 mb-4 bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-600" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* COUNTERS */}
        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <p>Total Students: <span className="font-semibold">{students.length}</span></p>
          <p>Selected: <span className="font-semibold">{selectedStudents.length}</span></p>
        </div>

        {/* STUDENT LIST */}
        <div className="border rounded-lg max-h-80 overflow-y-auto divide-y">
          {loading && <p className="text-center py-4 text-gray-500">Loading students...</p>}
          {error && <p className="text-center py-4 text-red-500">Error fetching students</p>}
          {!loading && filtered.length === 0 && (
            <p className="text-center py-4 text-gray-500">No students found</p>
          )}
          {!loading && filtered.map(student => (
            <div key={student._id} className="flex justify-between items-center p-3 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-500" />
                <div>
                  <p className="font-semibold">{student.fullName}</p>
                  <p className="text-sm text-gray-500">{student.course}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={selectedStudents.includes(student._id)}
                onChange={() => toggleStudent(student._id)}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Students
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssignStudentModal;
