
import React from 'react';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Information</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@befach.com</p>
                    <p className="text-gray-600">sales@befach.com</p>
                    <p className="text-gray-600">support@befach.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543 (Sales)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Head Office</h3>
                    <p className="text-gray-600">
                      BEFACH INTERNATIONAL<br />
                      123 Global Trade Center<br />
                      Suite 500<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Globe className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Website</h3>
                    <p className="text-gray-600">www.befach.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Inquiry about..."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Please describe your inquiry or requirements..."
                  ></textarea>
                </div>
                
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    I would like to receive updates and promotional emails from BEFACH INTERNATIONAL
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  Send Message
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Regional Offices</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Asia Pacific</h3>
                <p className="text-gray-600 text-sm">
                  Singapore Office<br />
                  123 Business Park<br />
                  Singapore 098765<br />
                  +65 6123 4567
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Europe</h3>
                <p className="text-gray-600 text-sm">
                  London Office<br />
                  456 Trade Street<br />
                  London EC1A 1BB, UK<br />
                  +44 20 7123 4567
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Middle East</h3>
                <p className="text-gray-600 text-sm">
                  Dubai Office<br />
                  789 Commerce Tower<br />
                  Dubai, UAE<br />
                  +971 4 123 4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
