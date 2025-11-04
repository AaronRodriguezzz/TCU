// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/ui/NavigationBar";
import Footer from "../components/ui/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <NavigationBar />

        {/* Main content */}
        <main className="flex-1 bg-gray-100">
            <Outlet /> 
        </main>
        
        <Footer />
    </div>
  );
};

export default UserLayout;