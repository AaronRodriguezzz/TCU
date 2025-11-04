import React from "react";
import { 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  CalendarDays, 
  GraduationCap, 
  ClipboardList,
  Bell,
  FileText,
  Building2
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-72 bg-white shadow-xl border-r border-red-100 text-gray-700 flex flex-col h-screen">
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
        <img
          src="./logo.png"
          alt="TCU LOGO"
          className="w-24 h-24 mb-2 rounded-full shadow-lg mx-auto border-4 border-white/90"
        />
        <h2 className="text-white text-center font-semibold mt-2">TCU Portal</h2>
      </div>
      <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 px-4 mb-1">ACADEMICS</div>
        <button
          onClick={() => setActivePage("classes")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "classes"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <GraduationCap size={20} strokeWidth={activePage === "classes" ? 2.5 : 2} />
          <span>Classes</span>
        </button>
        <button
          onClick={() => setActivePage("grades")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "grades"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <BookOpen size={20} strokeWidth={activePage === "grades" ? 2.5 : 2} />
          <span>Grades</span>
        </button>
        <button
          onClick={() => setActivePage("schedule")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "schedule"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <CalendarDays size={20} strokeWidth={activePage === "schedule" ? 2.5 : 2} />
          <span>Schedule</span>
        </button>
        <button
          onClick={() => setActivePage("attendance")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "attendance"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <ClipboardList size={20} strokeWidth={activePage === "attendance" ? 2.5 : 2} />
          <span>Attendance</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 px-4 mb-1 mt-4">ADMINISTRATION</div>
        <button
          onClick={() => setActivePage("students")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "students"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <Users size={20} strokeWidth={activePage === "students" ? 2.5 : 2} />
          <span>Students</span>
        </button>
        <button
          onClick={() => setActivePage("departments")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "departments"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <Building2 size={20} strokeWidth={activePage === "departments" ? 2.5 : 2} />
          <span>Departments</span>
        </button>

        <div className="text-xs font-semibold text-gray-400 px-4 mb-1 mt-4">GENERAL</div>
        <button
          onClick={() => setActivePage("announcements")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "announcements"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <Bell size={20} strokeWidth={activePage === "announcements" ? 2.5 : 2} />
          <span>Announcements</span>
        </button>
        <button
          onClick={() => setActivePage("documents")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "documents"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <FileText size={20} strokeWidth={activePage === "documents" ? 2.5 : 2} />
          <span>Documents</span>
        </button>
        <button
          onClick={() => setActivePage("account")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activePage === "account"
              ? "bg-red-50 text-red-600 font-medium shadow-sm"
              : "hover:bg-gray-50 hover:text-red-500"
          }`}
        >
          <Settings size={20} strokeWidth={activePage === "account" ? 2.5 : 2} />
          <span>Account</span>
        </button>
      </nav>

      <div className="mt-auto p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
