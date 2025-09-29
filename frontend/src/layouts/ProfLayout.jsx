// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar / Navigation */}
      <NavBar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* renders the child route (students, grades, account) */}
      </main>
    </div>
  );
};

export default Layout;
