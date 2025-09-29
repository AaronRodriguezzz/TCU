// src/pages/AccountPage.jsx
import React from "react";

const AccountPage = () => {
  return (
    <div className="p-6">

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="https://ui-avatars.com/api/?name=Prof+Admin&background=EF4444&color=fff"
            alt="Admin Avatar"
            className="w-20 h-20 rounded-full border-2 border-red-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Prof. Admin User</h2>
            <p className="text-gray-600">admin@university.edu</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Full Name</span>
              <span className="text-gray-600">Prof. Admin User</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email</span>
              <span className="text-gray-600">admin@university.edu</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Department</span>
              <span className="text-gray-600">Computer Science</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Employee ID</span>
              <span className="text-gray-600">TCU-2023-001</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Contact</span>
              <span className="text-gray-600">+63 912 345 6789</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Update Account
          </button>
          <button className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
            Change Password
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default AccountPage;
