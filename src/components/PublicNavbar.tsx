
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PublicNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/195e0529-837e-47f4-9881-981f6d53e663.png" 
              alt="BEFACH INTERNATIONAL" 
              className="h-10"
            />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Home
            </Link>
            <a 
              href="https://befach.com/pages/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:text-orange-500"
            >
              About
            </a>
            <Link 
              to="/contact" 
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium ${location.pathname === '/contact' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Contact
            </Link>
            <Link 
              to="/admin/login" 
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
