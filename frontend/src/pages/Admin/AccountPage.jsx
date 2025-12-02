import React, { useEffect } from "react";
import { Mail, Phone, Building, IdCard, User } from "lucide-react";

const AccountPage = () => {
  const admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
  
  return (
    <div className="p-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
            <div className="flex items-center gap-6">
              <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(admin.profile.fullName)}&background=dc2626&color=fff&bold=true`}                
                  alt="Admin Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white/90 shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-semibold">{admin.profile.fullName}</h2>
                <p className="text-red-100">{admin.profile.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  {admin.role}
                </span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <User size={20} className="mr-2 text-red-600" />
              Basic Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <IdCard size={16} className="mr-2" />
                  Employee ID
                </div>
                <p className="text-gray-900 font-medium">{admin.profile.employeeId}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail size={16} className="mr-2" />
                  Email Address
                </div>
                <p className="text-gray-900 font-medium">{admin.profile.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Building size={16} className="mr-2" />
                  Department
                </div>
                <p className="text-gray-900 font-medium">{admin.profile.department}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone size={16} className="mr-2" />
                  Contact Number
                </div>
                <p className="text-gray-900 font-medium">{admin.profile.contactNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
