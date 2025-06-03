
import React from 'react';
import { PublicNavbar } from '@/components/PublicNavbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to BEFACH INTERNATIONAL</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                BEFACH INTERNATIONAL is a leading global sourcing and procurement company specializing in connecting businesses with reliable suppliers worldwide. We serve as a comprehensive bridge between international suppliers and companies seeking quality products and services.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                To facilitate seamless global trade by providing businesses with access to verified, high-quality suppliers while ensuring transparent, efficient, and reliable procurement processes. We are committed to building long-lasting partnerships that drive mutual growth and success.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>• <strong>Supplier Verification:</strong> Rigorous vetting process to ensure reliability and quality standards</li>
                <li>• <strong>Global Sourcing:</strong> Access to suppliers across multiple industries and geographical regions</li>
                <li>• <strong>Procurement Solutions:</strong> End-to-end procurement services tailored to your business needs</li>
                <li>• <strong>Quality Assurance:</strong> Comprehensive quality control and inspection services</li>
                <li>• <strong>Logistics Support:</strong> Streamlined shipping and logistics coordination</li>
                <li>• <strong>Market Intelligence:</strong> Industry insights and market analysis to support informed decisions</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Expertise</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                With years of experience in international trade and procurement, our team brings deep expertise across various industries including manufacturing, technology, textiles, consumer goods, and industrial equipment. We understand the complexities of global supply chains and work diligently to simplify the procurement process for our clients.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose BEFACH INTERNATIONAL</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trusted Network</h3>
                  <p className="text-gray-700 text-sm">Extensive network of verified suppliers across the globe</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-700 text-sm">Rigorous quality control processes and supplier verification</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cost Effective</h3>
                  <p className="text-gray-700 text-sm">Competitive pricing and cost optimization strategies</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Reliable Service</h3>
                  <p className="text-gray-700 text-sm">Dedicated support and timely delivery commitments</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Started Today</h3>
                <p className="text-gray-700 mb-4">
                  Ready to streamline your procurement process? Contact us to learn how BEFACH INTERNATIONAL can help your business access the global marketplace with confidence.
                </p>
                <a 
                  href="/contact" 
                  className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
