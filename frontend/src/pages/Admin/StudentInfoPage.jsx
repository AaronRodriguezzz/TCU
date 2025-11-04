// src/pages/StudentViewPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  BookOpen,
  User, 
  IdCard 
} from "lucide-react";

const StudentViewPage = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  // Mock student data (in real app, fetch from API)
  const student = {
    id,
    name: "Juan Dela Cruz",
    course: "BS Computer Science",
    year: "3rd Year",
    email: "juan.delacruz@university.edu",
    contact: "0917-123-4567",
  };

  // Mock stats/grades
  const stats = [
    { subject: "Data Structures", grade: "A", semester: "1st Sem 2024" },
    { subject: "Web Development", grade: "B+", semester: "1st Sem 2024" },
    { subject: "Algorithms", grade: "A-", semester: "2nd Sem 2024" },
    { subject: "Operating Systems", grade: "B", semester: "2nd Sem 2024" },
  ];

  const getGradeColor = (grade) => {
    const firstChar = grade.charAt(0);
    switch(firstChar) {
      case 'A': return 'text-green-600 bg-green-50';
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 border border-red-100 transition-colors duration-200"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
            <div className="flex items-center gap-6">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=ffffff&color=dc2626&bold=true`}
                alt={student.name}
                className="w-24 h-24 rounded-full border-4 border-white/90 shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-semibold">{student.name}</h2>
                <p className="text-red-100">{student.course}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  {student.year}
                </span>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <User size={20} className="mr-2 text-red-600" />
              Basic Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <IdCard size={16} className="mr-2" />
                  Student ID
                </div>
                <p className="text-gray-900 font-medium">#{student.id}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail size={16} className="mr-2" />
                  Email Address
                </div>
                <p className="text-gray-900 font-medium">{student.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <GraduationCap size={16} className="mr-2" />
                  Course
                </div>
                <p className="text-gray-900 font-medium">{student.course}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone size={16} className="mr-2" />
                  Contact Number
                </div>
                <p className="text-gray-900 font-medium">{student.contact}</p>
              </div>
            </div>

            {/* Academic Performance */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <BookOpen size={20} className="mr-2 text-red-600" />
                Academic Performance
              </h3>
              <div className="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Subject</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Grade</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          Semester
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-white/80 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">{stat.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(stat.grade)}`}>
                            {stat.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{stat.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewPage;
