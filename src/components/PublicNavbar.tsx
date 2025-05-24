
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const PublicNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Supplier Directory
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-orange-500 font-medium' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about') 
                  ? 'text-orange-500 font-medium' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors ${
                isActive('/contact') 
                  ? 'text-orange-500 font-medium' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              Contact
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
