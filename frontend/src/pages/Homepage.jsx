import React from "react";
import { motion } from "framer-motion";

export default function TCUHomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-red-600 text-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Taguig City University</h1>
          <ul className="hidden md:flex space-x-8 text-lg">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#programs" className="hover:underline">Programs</a></li>
            <li><a href="#admissions" className="hover:underline">Admissions</a></li>
            <li><a href="#campus" className="hover:underline">Campus Life</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-center text-white bg-no-repeat bg-left bg-cover"
        style={{ backgroundImage: "url('/campus.jpg')" }}
      >
        <div className="absolute inset-0 bg-red-900/70" /> {/* Overlay */}
        <div className="flex flex-col justify-center items-center relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
          >
            Welcome to Taguig City University
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md"
          >
            Excellence, Integrity, and Service – Shaping the future of Taguig and beyond.
          </motion.p>
          <motion.a
            href="#admissions"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            Apply Now
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-20 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pattern-light.png')" }}
      >
        <div className="absolute inset-0 bg-white/90" /> {/* Overlay */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-red-600 mb-6"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-700"
          >
            Taguig City University (TCU) is a center of excellence in education,
            dedicated to fostering innovation, leadership, and academic growth.
            We are committed to producing globally competitive graduates who
            contribute positively to society.
          </motion.p>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 text-center mb-12"
        >
          Academic Programs
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            "Engineering",
            "Business Administration",
            "Education",
            "Information Technology",
            "Nursing",
            "Arts & Sciences",
          ].map((program, index) => (
            <motion.div
              key={program}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">
                {program}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                Explore our {program} program designed to prepare students with practical skills and academic excellence.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-20 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 mb-6"
        >
          Admissions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 max-w-2xl mx-auto mb-8"
        >
          Join Taguig City University and become part of a thriving community.
          Our admissions process is designed to be simple and accessible to
          aspiring students.
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-700"
        >
          Start Your Application
        </motion.a>
      </section>

      {/* Campus Life Section */}
      <section
        id="campus"
        className="relative py-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/students.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" /> {/* Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-red-600 text-center mb-12"
          >
            Campus Life
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {["Clubs & Organizations", "Sports & Recreation", "Events & Activities"].map(
              (life, index) => (
                <motion.div
                  key={life}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">
                    {life}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    Experience vibrant {life.toLowerCase()} at TCU, where students grow beyond the classroom.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 mb-6"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 max-w-2xl mx-auto mb-8"
        >
          Have questions? Reach out to our admissions office or visit our campus.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-2 text-gray-700"
        >
          <p>Email: admissions@tcu.edu.ph</p>
          <p>Phone: (02) 888-1234</p>
          <p>Address: General Santos Avenue, Central Bicutan, Taguig City</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 px-6 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Taguig City University. All rights reserved.</p>
        <p>Designed with ❤️ using React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
78