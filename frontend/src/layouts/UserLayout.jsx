// src/layouts/UserLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "../components/ui/NavigationBar";
import Footer from "../components/ui/Footer";

const UserLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
          navigate('/login')
      }
  }, []);

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