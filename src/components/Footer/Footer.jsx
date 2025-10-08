import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-orange-100 py-10 border-t-2 border-orange-300">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-wrap justify-between items-start gap-8">

          {/* Logo & description */}
          <div className="w-full md:w-1/2 lg:w-5/12">
            <Logo width="120px" />
            <p className="mt-4 text-gray-700 text-sm">
              MegaBlog Project — a place to create, share, and explore posts made by me during learning React & Appwrite.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="https://github.com/Technoritesh152005" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
                <FaGithub size={18} />
              </a>
              <a href="www.linkedin.com/in/ritesh-khilari-6882342b8" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
                <FaLinkedin size={18} />
              </a>
             
            </div>
          </div>

          {/* Quick links */}
          <div className="w-full md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-600 mb-4">Explore</h3>
            <ul>
              {['All Posts', 'Add Post', 'About'].map(item => (
                <li key={item} className="mb-2">
                  <Link to="/" className="text-gray-800 hover:text-orange-500 text-sm transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Info */}
          <div className="w-full md:w-1/2 lg:w-2/12">
            <h3 className="text-xs font-semibold uppercase text-gray-600 mb-4">Info</h3>
            <ul>
              {['Help', 'Contact', 'Terms'].map(item => (
                <li key={item} className="mb-2">
                  <Link to="/" className="text-gray-800 hover:text-orange-500 text-sm transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 text-gray-700 text-sm border-t border-orange-300 pt-4">
          &copy; 2025 MegaBlog Project. Made by Ritesh khilari
        </div>
      </div>
    </footer>
  );
}

export default Footer;
