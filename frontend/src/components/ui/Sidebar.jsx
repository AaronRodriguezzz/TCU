import React from "react";
import { Users, BookOpen, Settings, LogOut } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 bg-gradient-to-b from-red-600 to-gray-900 text-white flex flex-col p-6">
      <img
        src="./logo.png"
        alt="TCU LOGO"
        className="w-28 h-28 mb-6 rounded-full shadow-md mx-auto"
      />
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setActivePage("students")}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
            activePage === "students" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Users size={20} /> Students
        </button>
        <button
          onClick={() => setActivePage("grades")}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
            activePage === "grades" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <BookOpen size={20} /> Grades
        </button>
        <button
          onClick={() => setActivePage("account")}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
            activePage === "account" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Settings size={20} /> Account
        </button>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
