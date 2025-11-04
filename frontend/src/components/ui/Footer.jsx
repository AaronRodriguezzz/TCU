import React from 'react';
import { Facebook, Mail, MapPin, Phone, Twitter, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="TCU Logo"
                                className="w-12 h-12 rounded-full border-2 border-white/20"
                            />
                            <div>
                                <h3 className="font-bold text-lg">TCU Portal</h3>
                                <p className="text-sm text-red-100">Excellence & Service</p>
                            </div>
                        </div>
                        <p className="text-red-100 text-sm">
                            Providing quality education and shaping the future leaders of Taguig City.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 flex-shrink-0" />
                                <span className="text-red-100">
                                    General Santos Ave, Lower Bicutan, Taguig City, Metro Manila
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="flex-shrink-0" />
                                <span className="text-red-100">(02) 8837-5858</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="flex-shrink-0" />
                                <a href="mailto:info@tcu.edu.ph" className="text-red-100 hover:text-white transition-colors">
                                    info@tcu.edu.ph
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect with Us */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com/TaguigCityUniversity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://twitter.com/TaguigCityU"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://youtube.com/TaguigCityUniversity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Youtube size={20} />
                            </a>
                            <a
                                href="https://instagram.com/TaguigCityUniversity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-red-100">
                            &copy; {new Date().getFullYear()} Taguig City University. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy" className="text-red-100 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-red-100 hover:text-white transition-colors">
                                Terms of Use
                            </Link>
                            <Link to="/sitemap" className="text-red-100 hover:text-white transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;