import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Phone,
  Mail,
  MapPin,
  Building2,
  Activity,
  School,
} from "lucide-react";
import { useFetch } from "../../hooks/fetchData";

export default function TCUHomePage() {
  const { response, loading, error } = useFetch("/announcements");
  console.log(response);
  const announcements = response?.data || [];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/campus.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-red-900/75" />
        </div>

        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium">
              Admission for 2026 is now open
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Welcome to
            <span className="block mt-2">Taguig City University</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-red-50"
          >
            Excellence, Integrity, and Service – Shaping the future of Taguig
            and beyond. Join us in our mission to provide world-class education
            and create tomorrow's leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#programs"
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:bg-red-50 transition-colors duration-300 min-w-[200px]"
            >
              Explore Programs
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { number: "20+", label: "Academic Programs" },
              { number: "5,000+", label: "Students" },
              { number: "500+", label: "Faculty Members" },
              { number: "98%", label: "Employment Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-red-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-1 h-16 bg-white/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll" />
          </div>
          <span className="text-sm mt-2 text-red-100">Scroll to explore</span>
        </motion.div>
      </section>

      {/* ================================ */}
      {/* ANNOUNCEMENTS SECTION */}
      {/* ================================ */}
      <section id="announcements" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <Activity size={32} className="text-red-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Latest Announcements
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-600">Loading announcements...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-600">
              Failed to load announcements.
            </p>
          )}

          {/* No Data */}
          {!loading && announcements.length === 0 && (
            <p className="text-center text-gray-500">
              No announcements available.
            </p>
          )}

          {/* Announcement Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {announcements.map((a, index) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  {a.title}
                </h3>

                <p className="text-gray-700 text-sm mb-4">{a.content}</p>

                <p className="text-xs text-gray-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-20 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pattern-light.png')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
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
      <section id="programs" className="py-20 px-6 bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <BookOpen size={32} className="text-red-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            Academic Programs
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { name: "Engineering", icon: Building2 },
            { name: "Business Administration", icon: Activity },
            { name: "Education", icon: GraduationCap },
            { name: "Information Technology", icon: BookOpen },
            { name: "Tourism", icon: Users },
            { name: "Arts & Sciences", icon: School },
          ].map(({ name, icon: Icon }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white shadow-sm hover:shadow-md rounded-xl p-6 border border-gray-100 hover:border-red-100 transition duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <Icon size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {name}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Explore our {name} program designed to prepare students with
                  practical skills and academic excellence.
                </p>
              </div>
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
        <div className="absolute inset-0 bg-white/85" />
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
            {[
              "Clubs & Organizations",
              "Sports & Recreation",
              "Events & Activities",
            ].map((life, index) => (
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
                  Experience vibrant {life.toLowerCase()} at TCU, where
                  students grow beyond the classroom.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Phone size={32} className="text-red-600" />
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 max-w-2xl mx-auto mb-12"
        >
          Have questions? Reach out to our admissions office or visit our
          campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-red-600">admissions@tcu.edu.ph</p>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Phone size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-red-600">(02) 888-1234</p>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Address
            </h3>
            <p className="text-red-600">
              General Santos Avenue, Central Bicutan, Taguig City
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
