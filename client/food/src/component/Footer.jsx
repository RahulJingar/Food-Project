import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Food-Project
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Discover delicious food from top restaurants. Fast delivery, 
              genuine ratings, and easy online ordering at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 block py-1">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 block py-1">Restaurants</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 block py-1">Menu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 block py-1">Contact</a></li>
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Get the App</h4>
            <div className="space-y-3">
              <a href="#" className="block">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 rounded-xl border border-gray-600 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">App</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Download on App Store</p>
                      <p className="text-xs text-gray-400">Get the app now</p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 rounded-xl border border-gray-600 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">GP</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Get on Play Store</p>
                      <p className="text-xs text-gray-400">Go to mobile version</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Social & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
            <div className="space-y-4">
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <span>📘</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-pink-500 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <span>📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <span>🐦</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-500 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <span>🎥</span>
                </a>
              </div>
              <div className="text-sm">
                <p className="text-gray-300 mb-2">Help & Support</p>
                <a href="#" className="text-xs text-orange-400 hover:text-orange-300">Contact us →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Food-Project. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
