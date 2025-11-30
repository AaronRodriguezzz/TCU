// src/components/Layout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const storedAdmin = localStorage.getItem('loggedInAdmin');
      if (!storedAdmin) {
          navigate('/admin/login')
      }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar / Navigation */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* renders the child route (students, grades, account) */}
      </main>
    </div>
  );
};

export default AdminLayout;
