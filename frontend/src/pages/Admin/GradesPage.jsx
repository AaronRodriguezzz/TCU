import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import axios from "axios";
import { computeTotalGrade } from "../../utils/gradeCompute";

const GradesPage = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [gradesState, setGradesState] = useState({});
  const [gradeType, setGradeType] = useState(""); // "midterm" or "final"

  const loggedUser = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const professorId = loggedUser?._id;

  const { response, loading, refetch } = useFetch(
    `/class/prof/${professorId}`,
    null,
    null,
    []
  );
  const classList = response?.data || [];

  // Set default selected class after fetching classes
  useEffect(() => {
    if (classList.length > 0 && !selectedClassId) {
      setSelectedClassId(classList[0]._id);
    }
  }, [classList, selectedClassId]);

  const selectedClass = classList.find((c) => c._id === selectedClassId);
  const enrolledStudents = selectedClass?.enrolledStudents || [];

  // Filtered students
  const filteredStudents = enrolledStudents.filter(
    (s) =>
      s.student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  // Start editing grades
  const handleEditGrades = () => {
    // Determine whether editing midterm or final
    const type =
      enrolledStudents.every((s) => s.exams.midTerm > 0) ? "final" : "midterm";
    const initialGrades = {};
    enrolledStudents.forEach((s) => {
      initialGrades[s.student._id] =
        type === "midterm" ? s.exams.midTerm : s.exams.finals;
    });
    setGradesState(initialGrades);
    setGradeType(type);
    setEditing(true);
  };

  const handleGradeChange = (studentId, value) => {
    setGradesState((prev) => ({ ...prev, [studentId]: Number(value) }));
  };

  const handleCancel = () => {
    setEditing(false);
    setGradesState({});
  };

  const handleSave = async () => {
    const records = Object.entries(gradesState).map(([studentId, grade]) => ({
      studentId,
      grade,
    }));
    try {
      const res = await axios.put(
        `http://localhost:4001/api/class/grades/${selectedClassId}`,
        { records, type: gradeType }
      );

      if (res.data.success) {
        setEditing(false);
        setGradesState({});
        alert("Grades saved successfully!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save grades.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Grades Management</h1>
          <div className="flex gap-3">
            {!editing && (
              <button
                onClick={handleEditGrades}
                disabled={!selectedClass}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Enter Grades
              </button>
            )}
            {editing && (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Class Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <select
            value={selectedClassId || ""}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full sm:w-[250px] py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
          >
            <option value="" disabled>
              Select Class
            </option>
            {classList.map((c) => (
              <option key={c._id} value={c._id}>
                {c.subject.subjectName}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-[250px]">
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Present</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Absent</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    {editing ? gradeType.toUpperCase() : "Midterm"}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Final</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total (GWA)</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s, idx) => {
                    const mid = s.exams.midTerm;
                    const fin = s.exams.finals;
                    const { total, status } = computeTotalGrade(
                      s.attendance.presentCount,
                      s.attendance.absentCount,
                      mid,
                      fin
                    );

                    return (
                      <tr
                        key={s.student._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-red-600">{idx + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {s.student.fullName}
                        </td>
                        <td className="px-6 py-4">{s.attendance.presentCount}</td>
                        <td className="px-6 py-4">{s.attendance.absentCount}</td>

                        {/* Midterm */}
                        <td className="px-6 py-4">
                          {editing && gradeType === "midterm" ? (
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={gradesState[s.student._id] ?? mid}
                              onChange={(e) => handleGradeChange(s.student._id, e.target.value)}
                              className="w-20 px-2 py-1 border rounded"
                            />
                          ) : mid > 0 ? mid : "-"}
                        </td>

                        {/* Final */}
                        <td className="px-6 py-4">
                          {editing && gradeType === "final" ? (
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={gradesState[s.student._id] ?? fin}
                              onChange={(e) => handleGradeChange(s.student._id, e.target.value)}
                              className="w-20 px-2 py-1 border rounded"
                            />
                          ) : fin > 0 ? fin : "-"}
                        </td>

                        <td className="px-6 py-4">{total}</td>
                        <td className="px-6 py-4">{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No students found.
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

export default GradesPage;
