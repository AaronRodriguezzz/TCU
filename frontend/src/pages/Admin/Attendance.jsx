import React, { useState, useEffect } from "react";
import { CalendarDays, Search } from "lucide-react";
import { useFetch } from "../../hooks/fetchData";
import axios from "axios";

const AttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [markingAttendance, setMarkingAttendance] = useState(false);
  const [attendanceState, setAttendanceState] = useState({});
  const [search, setSearch] = useState("");
  const [alreadyMarked, setAlreadyMarked] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const professorId = loggedUser?._id;

  const { response: classesResponse, loading: classesLoading, refetch } = useFetch(
    `/class/prof/${professorId}`,
    null,
    null,
    []
  );
  const classList = classesResponse?.data || [];

  useEffect(() => {
    if (classList.length > 0 && !selectedClassId) setSelectedClassId(classList[0]._id);
  }, [classList]);

  const selectedClass = classList.find((c) => c._id === selectedClassId);
  const enrolledStudents = selectedClass?.enrolledStudents || [];

  // Check if attendance has been taken today
  useEffect(() => {
    if (!selectedClass) return;
    const today = new Date().toISOString().split("T")[0];
    const attendanceToday = selectedClass.attendanceRecords?.some(
      (record) => record.date === today
    );
    setAlreadyMarked(attendanceToday);
  }, [selectedClass]);

  const filteredStudents = enrolledStudents.filter((es) =>
    es.student.fullName.toLowerCase().includes(search.toLowerCase()) ||
    es.student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartAttendance = () => {
    const initialState = {};
    enrolledStudents.forEach((es) => {
      initialState[es.student._id] = true; // default present
    });
    setAttendanceState(initialState);
    setMarkingAttendance(true);
  };

  const handleCheckboxChange = (studentId) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleCancelAttendance = () => {
    setMarkingAttendance(false);
    setAttendanceState({});
  };

  const handleSaveAttendance = async () => {
    try {
      const payload = Object.entries(attendanceState).map(([studentId, present]) => ({
        studentId,
        present,
      }));

      console.log(selectedClassId)

      const response = await axios.put(`http://localhost:4001/api/class/attendance/${selectedClassId}`, { records: payload });
      
      if(response.data.success){
        alert('Attendance Saved')
        setMarkingAttendance(false);
        setAttendanceState({});
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarDays size={32} className="text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
              {selectedClass && (
                <p className="text-gray-600 text-sm mt-1">
                  Subject: <span className="text-red-600">{selectedClass.subject.subjectName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2 sm:mt-0">
            {!markingAttendance ? (
              <button
                onClick={handleStartAttendance}
                disabled={alreadyMarked}
                className={`px-4 py-2 rounded text-white ${
                  alreadyMarked ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {alreadyMarked ? "Attendance Already Taken" : "Mark Attendance"}
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveAttendance}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelAttendance}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters: Class & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3 w-full sm:w-auto">
            <select
              value={selectedClassId || ""}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="appearance-none w-full sm:w-[250px] py-2 pl-3 pr-8 rounded-lg border border-gray-200 shadow-sm
              focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm text-gray-700"
            >
              {classesLoading ? (
                <option>Loading classes...</option>
              ) : classList.length > 0 ? (
                classList.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.subject.subjectName}
                  </option>
                ))
              ) : (
                <option disabled>No classes found</option>
              )}
            </select>

            <div className="relative w-full sm:w-[250px]">
              <input
                type="text"
                placeholder="Search by Student ID or Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm
                  focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student ID</th>
                  {markingAttendance && (
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Present</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((es, index) => (
                  <tr key={es.student._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{es.student.fullName}</td>
                    <td className="px-6 py-4">{es.student.studentId}</td>
                    {markingAttendance && (
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={attendanceState[es.student._id] || false}
                          onChange={() => handleCheckboxChange(es.student._id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
