import React from 'react'

const Login = () => {
  return (
    <div className="relative h-screen flex justify-center items-center font-montserrat">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-red-600/80 to-gray-900/80 z-10"></div>

      {/* Login Form Container */}
      <form className="relative z-20 flex flex-col items-center bg-white/15 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
        
        {/* Logo */}
        <img
          src="./logo.png"
          alt="TCU LOGO"
          className="w-28 h-28 mb-4 rounded-full shadow-md"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-200 text-sm mb-6">Sign in to continue to your account</p>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-lg bg-gray-100 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 placeholder-gray-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-gray-100 p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 placeholder-gray-500"
        />

        {/* Button */}
        <button className="w-full bg-red-600 py-3 mb-6 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-200 shadow-md">
          LOG IN
        </button>

        {/* Forget Password */}
        <a
          href="/"
          className="text-gray-300 text-sm hover:text-white underline underline-offset-2 transition"
        >
          Forgot Password?
        </a>
      </form>
    </div>
  )
}

export default Login
