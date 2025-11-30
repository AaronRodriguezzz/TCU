import React from "react";
import { 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  GraduationCap, 
  ClipboardList,
  Bell,
  FileText,
  Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, page) => {
    if (setActivePage) setActivePage(page);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInAdmin');
    navigate('/admin/login');
  }

  const navItems = [
    {
      title: "ACADEMICS",
      items: [
        { label: "Classes", icon: GraduationCap, path: "/classes", key: "classes" },
        { label: "Grades", icon: BookOpen, path: "/grades", key: "grades" },
        { label: "Attendance", icon: ClipboardList, path: "/attendance", key: "attendance" },
      ],
    },
    {
      title: "ADMINISTRATION",
      items: [
        { label: "Students", icon: Users, path: "/students", key: "students" },
        { label: "Departments", icon: Building2, path: "/departments", key: "departments" },
      ],
    },
    {
      title: "GENERAL",
      items: [
        { label: "Announcements", icon: Bell, path: "/announcements", key: "announcements" },
        { label: "Documents", icon: FileText, path: "/documents", key: "documents" },
        { label: "Account", icon: Settings, path: "/account", key: "account" },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-white shadow-xl border-r border-red-100 text-gray-700 flex flex-col h-screen">
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
        <img
          src='./logo.png'
          alt="TCU LOGO"
          className="w-24 h-24 mb-2 rounded-full shadow-lg mx-auto border-4 border-white/90"
        />
        <h2 className="text-white text-center font-semibold mt-2">TCU Portal</h2>
      </div>

      <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
        {navItems.map((section) => (
          <div key={section.title}>
            <div className="text-xs font-semibold text-gray-400 px-4 mb-1 mt-4">
              {section.title}
            </div>
            {section.items.map(({ label, icon: Icon, path, key }) => {
              const isActive = activePage === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleNavigation(path, key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-red-50 text-red-600 font-medium shadow-sm"
                      : "hover:bg-gray-50 hover:text-red-500"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-gray-100">
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
