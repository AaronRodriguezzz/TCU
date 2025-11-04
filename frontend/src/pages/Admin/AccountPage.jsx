// src/pages/AccountPage.jsx
import React from "react";
import { Mail, Phone, Building, IdCard, User, Lock, Pencil } from "lucide-react";

const AccountPage = () => {
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
                src="https://ui-avatars.com/api/?name=Prof+Admin&background=ffffff&color=dc2626&bold=true"
                alt="Admin Avatar"
                className="w-24 h-24 rounded-full border-4 border-white/90 shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-semibold">Prof. Admin User</h2>
                <p className="text-red-100">admin@university.edu</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                  Administrator
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
                <p className="text-gray-900 font-medium">TCU-2023-001</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail size={16} className="mr-2" />
                  Email Address
                </div>
                <p className="text-gray-900 font-medium">admin@university.edu</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Building size={16} className="mr-2" />
                  Department
                </div>
                <p className="text-gray-900 font-medium">Computer Science</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50/50">
                <div className="flex items-center text-gray-600 mb-1">
                  <Phone size={16} className="mr-2" />
                  Contact Number
                </div>
                <p className="text-gray-900 font-medium">+63 912 345 6789</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-red-700 transition-colors duration-200 flex items-center justify-center">
                <Pencil size={18} className="mr-2" />
                Update Profile
              </button>
              <button className="flex-1 bg-white text-red-600 px-6 py-3 rounded-lg shadow-sm border border-red-200 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center">
                <Lock size={18} className="mr-2" />
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
