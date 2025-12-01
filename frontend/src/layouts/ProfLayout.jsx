// src/components/Layout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    const storedAdmin = JSON.parse(localStorage.getItem("loggedInUser") || "null");
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
