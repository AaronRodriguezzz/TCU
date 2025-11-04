import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
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
                src="./logo.png"
                alt="TCU LOGO"
                className="w-20 h-20 rounded-full shadow-md border-4 border-red-50"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
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

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <a
                href="/"
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-red-600/85 via-red-800/80 to-gray-900/80 text-white py-3 rounded-lg font-semibold shadow-md hover:from-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-200"
            >
              Sign In
            </button>

            {/* Additional Info */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Having trouble logging in? Contact{' '}
              <a href="/" className="text-red-600 hover:text-red-700 font-medium">
                IT Support
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('./bg.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/55 via-red-800/50 to-gray-900/50" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-white p-12 z-10">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Taguig City University
          </h2>
          <p className="text-xl text-red-100 text-center max-w-md">
            Excellence, Integrity, and Service – Shaping the future of Taguig and beyond.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
