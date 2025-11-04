import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 font-montserrat">
      {/* Left Side - Login Form */}
      <div className="relative flex items-center justify-center p-8 bg-white z-10">
        <div className="w-full max-w-md">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <img
                src="/logo.png"
                alt="TCU LOGO"
                className="w-20 h-20 rounded-full shadow-md border-4 border-red-50"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Shield size={24} className="text-red-600" />
              <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            </div>
            <p className="text-gray-500 mt-2">Access the administrative dashboard</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Admin ID Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Admin ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your admin ID"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-red-300 focus:ring-4 focus:ring-red-100 transition-colors duration-200 text-gray-800 placeholder-gray-400 bg-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:border-red-300 focus:ring-4 focus:ring-red-100 transition-colors duration-200 text-gray-800 placeholder-gray-400 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                <span className="font-medium">Security Notice:</span> This portal is for authorized administrative personnel only. Unauthorized access attempts will be logged and reported.
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-3 rounded-lg font-semibold shadow-md hover:from-red-700 hover:to-red-900 focus:ring-4 focus:ring-red-100 transition-all duration-200"
            >
              Access Admin Portal
            </button>

            {/* Additional Info */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Need assistance? Contact{' '}
              <a href="/" className="text-red-600 hover:text-red-700 font-medium">
                System Administrator
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/60 via-red-800/55 to-gray-900/50" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-white p-12 z-10">
          <h2 className="text-4xl font-bold mb-6 text-center">
            TCU Administration
          </h2>
          <p className="text-xl text-red-100 text-center max-w-md">
            Manage, Monitor, and Maintain – Empowering education through efficient administration
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
