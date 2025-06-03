
import React from 'react';
import { PublicNavbar } from '@/components/PublicNavbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About BEFACH INTERNATIONAL</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              BEFACH INTERNATIONAL is dedicated to connecting businesses with the best suppliers worldwide. 
              We provide a comprehensive directory that helps companies find reliable partners for their sourcing needs.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our platform serves as a bridge between suppliers and businesses, offering detailed profiles, 
              product catalogs, and contact information to facilitate successful business relationships.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us</h2>
            <ul className="text-gray-700 space-y-2">
              <li>• Comprehensive supplier database</li>
              <li>• Verified supplier information</li>
              <li>• Easy search and filtering options</li>
              <li>• Direct contact capabilities</li>
              <li>• Regular updates and maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
