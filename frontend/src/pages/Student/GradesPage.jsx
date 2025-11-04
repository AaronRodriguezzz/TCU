import { Book, Calculator, ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";

const GradesPage = () => {
  const [selectedSemester, setSelectedSemester] = useState("2025-2026-1");

  // This would typically come from your API/backend
  const grades = {
    "2025-2026-1": {
      semester: "1st Semester",
      academicYear: "2025-2026",
      gpa: 1.75,
      courses: [
        {
          code: "IT 101",
          name: "Introduction to Computing",
          units: 3,
          grade: 1.5,
          status: "Passed"
        },
        {
          code: "IT 102",
          name: "Computer Programming 1",
          units: 3,
          grade: 2.0,
          status: "Passed"
        },
        {
          code: "MATH 101",
          name: "College Algebra",
          units: 3,
          grade: 1.75,
          status: "Passed"
        },
        {
          code: "ENG 101",
          name: "Technical Writing",
          units: 3,
          grade: 1.5,
          status: "Passed"
        },
        {
          code: "PE 101",
          name: "Physical Education 1",
          units: 2,
          grade: 2.0,
          status: "Passed"
        }
      ]
    },
    "2025-2026-2": {
      semester: "2nd Semester",
      academicYear: "2025-2026",
      gpa: 1.85,
      courses: [
        {
          code: "IT 103",
          name: "Computer Programming 2",
          units: 3,
          grade: 1.75,
          status: "Passed"
        },
        {
          code: "IT 104",
          name: "Data Structures",
          units: 3,
          grade: 2.0,
          status: "Passed"
        },
        {
          code: "MATH 102",
          name: "Trigonometry",
          units: 3,
          grade: 1.75,
          status: "Passed"
        }
      ]
    }
  };

  const getGradeColor = (grade) => {
    if (grade <= 1.5) return "text-green-600";
    if (grade <= 2.0) return "text-blue-600";
    if (grade <= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const semesters = Object.keys(grades).map(key => ({
    id: key,
    label: `${grades[key].semester} - ${grades[key].academicYear}`
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-25 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Grade Report</h1>
                <p className="text-gray-500">View your academic performance</p>
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* GPA Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-md p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Grade Point Average (GPA)</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <p className="text-red-100 text-sm">Semester GPA</p>
              <p className="text-3xl font-bold">{grades[selectedSemester].gpa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Book className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-800">Course Grades</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grades[selectedSemester].courses.map((course, index) => (
                  <tr key={course.code} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {course.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`font-medium ${getGradeColor(course.grade)}`}>
                        {course.grade.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${course.status === "Passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
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
  );
};

export default GradesPage;
