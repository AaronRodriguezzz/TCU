import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchData";
import { useStudentGrades } from "../../hooks/studentGrades";
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  User,
  IdCard,
  Calculator,
  ChevronDown
} from "lucide-react";

const StudentViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { response, loading, error } = useFetch(`/students/${id}`);
  const { classes, gwa } = useStudentGrades(id);

  const [selectedSemester, setSelectedSemester] = useState("");

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error.message}</p>;
  if (!response) return <p className="p-6">No data found.</p>;

  const student = {
    id,
    name: response.data.fullName,
    course: response.data.course,
    year: response.data.yearLevel,
    email: response.data.email,
  };

  const semesters = classes.length
    ? Array.from(new Set(classes.map((cls) => `${cls.schoolYear}-${cls.semester}`)))
    : [];

  useEffect(() => {
    if (semesters.length && !selectedSemester) {
      setSelectedSemester(semesters[0]);
    }
  }, [semesters]);

  const filteredClasses = classes.filter(
    (cls) => `${cls.schoolYear}-${cls.semester}` === selectedSemester
  );

  const semesterGPA = (() => {
    const totalUnits = filteredClasses.reduce((sum, c) => sum + c.units, 0);
    const totalPoints = filteredClasses.reduce(
      (sum, c) => sum + (typeof c.grade === "number" ? c.grade * c.units : 0),
      0
    );
    return totalUnits ? totalPoints / totalUnits : 0;
  })();

  const getGradeColor = (grade) => {
    if (typeof grade !== "number")
      return "text-gray-600 bg-gray-100";
    if (grade >= 3.5) return "text-green-600 bg-green-50";
    if (grade >= 2.5) return "text-blue-600 bg-blue-50";
    if (grade >= 1.5) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Student Profile</h1>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* PROFILE */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-red-600" /> Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 flex items-center">
                <IdCard size={16} className="mr-2" /> Student ID
              </p>
              <p className="font-medium">{student.id}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center">
                <Mail size={16} className="mr-2" /> Email
              </p>
              <p className="font-medium">{student.email}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center">
                <GraduationCap size={16} className="mr-2" /> Course
              </p>
              <p className="font-medium">{student.course}</p>
            </div>
          </div>

          {/* ACADEMIC PERFORMANCE */}
          <div className="mt-10 space-y-6">

            {/* Semester + GPA */}
            <div className="grid md:grid-cols-3 gap-6">

              <div className="col-span-2 bg-white p-6 shadow rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Academic Performance</h3>
                    <p className="text-gray-500">Grades per semester</p>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="border px-4 py-2 rounded-lg"
                    >
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* GPA BOX */}
              <div className="bg-red-600 text-white p-6 rounded-xl shadow">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                  <Calculator size={18} className="animate-pulse" />
                  Semester GPA
                </h3>
                <p className="text-4xl font-bold">
                  {semesterGPA.toFixed(2)}
                </p>
              </div>

            </div>

            {/* GRADES TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">Code</th>
                    <th className="p-4">Course</th>
                    <th className="p-4 text-center">Units</th>
                    <th className="p-4 text-center">Grade</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredClasses.map((course, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4">{course.code}</td>
                      <td className="p-4">{course.name}</td>
                      <td className="p-4 text-center">{course.units}</td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded ${getGradeColor(course.grade)}`}
                        >
                          {typeof course.grade === "number"
                            ? course.grade.toFixed(2)
                            : "Processing"}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            course.status === "Passed"
                              ? "bg-green-100 text-green-700"
                              : course.status === "Processing"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentViewPage;
