
import React from 'react';
import { Link } from 'react-router-dom';

export const PublicNavbar = () => {
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
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium">
              Contact
            </Link>
            <Link to="/admin/login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
