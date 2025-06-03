
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { MapPin, Clock, Mail, Phone, Globe, FileText, ArrowLeft, Package } from 'lucide-react';

const SupplierDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: supplier, isLoading, error } = useQuery({
    queryKey: ['supplier', slug],
    queryFn: () => db.getSupplierBySlug(slug!),
    enabled: !!slug,
  });

  const handleCatalogueDownload = () => {
    if (supplier?.catalogue_file_url) {
      window.open(supplier.catalogue_file_url, '_blank');
    }
  };

  console.log('Supplier data:', supplier);
  console.log('Catalogue file URL:', supplier?.catalogue_file_url);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
          <p className="text-gray-600 mb-6">
            The supplier you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">Browse All Suppliers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Directory Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Link>

        {/* Supplier Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            {supplier.logo_url ? (
              <img
                src={supplier.logo_url}
                alt={supplier.name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-gray-400 text-2xl">🏢</span>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{supplier.name}</h1>
              
              {supplier.city && (
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{supplier.city}</span>
                </div>
              )}
              
              {supplier.description && (
                <p className="text-gray-700 leading-relaxed">
                  {supplier.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products & Services */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <Package className="w-5 h-5 mr-2 text-orange-500" />
                  Products & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supplier.products && supplier.products.length > 0 ? (
                  <ul className="space-y-3">
                    {supplier.products.map((product, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{product}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specific products listed.</p>
                )}
              </CardContent>
            </Card>

            {/* Industry Categories */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Industry Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supplier.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {supplier.categories.map(category => (
                      <span
                        key={category}
                        className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-sm rounded-lg font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No categories specified.</p>
                )}
              </CardContent>
            </Card>

            {/* Additional Description */}
            {supplier.description && (
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    About {supplier.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {supplier.name} leads the industry in sustainable solutions and high-quality products. Our 
                    innovative offerings help businesses achieve their goals while maintaining excellence and 
                    integrity. We source materials from trusted suppliers and ensure a fully transparent supply 
                    chain.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With over {supplier.partnership_years || 10} years of dedicated partnership, we've helped hundreds of businesses 
                    transition to better solutions without compromising on quality or efficiency. Our team of experts is 
                    always available to consult on your specific needs.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Sidebar */}
          <div>
            <Card className="bg-white shadow-sm border border-gray-200 sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplier.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <a 
                        href={`mailto:${supplier.email}`}
                        className="text-orange-500 hover:text-orange-600 underline break-all"
                      >
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {supplier.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <a 
                        href={`tel:${supplier.phone}`}
                        className="text-orange-500 hover:text-orange-600 underline"
                      >
                        {supplier.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {supplier.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <a 
                        href={supplier.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600 underline break-all"
                      >
                        {supplier.website.replace('https://', '').replace('http://', '')}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                  <div className="text-gray-700">
                    {supplier.city || 'Location not specified'}
                  </div>
                </div>

                {supplier.partnership_years && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-500 mr-3" />
                    <div className="text-gray-700">
                      Exporting from {supplier.partnership_years} years
                    </div>
                  </div>
                )}
                
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                    Contact This Supplier
                  </Button>
                  
                  {supplier.catalogue_file_url && (
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center justify-center gap-2" 
                      size="lg"
                      onClick={handleCatalogueDownload}
                    >
                      <FileText className="w-4 h-4" />
                      Download Catalogue
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Supplier Directory</h3>
              <p className="text-gray-600 text-sm">
                Find trusted suppliers for your business needs. Our directory features quality partners that help deliver excellence.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-orange-500 text-sm">Home</Link>
                <Link to="/about" className="block text-gray-600 hover:text-orange-500 text-sm">About Us</Link>
                <Link to="/contact" className="block text-gray-600 hover:text-orange-500 text-sm">Contact</Link>
                <Link to="/privacy" className="block text-gray-600 hover:text-orange-500 text-sm">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#513220' }} />
                  <div className="text-sm text-black">
                    <p className="font-medium">3rd floor, Luxor Park, Road No.2 Banjara Hills</p>
                    <p>Hyderabad, Telangana, 500034</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#513220' }} />
                  <a href="mailto:sales@befach.com" className="text-sm text-black hover:text-gray-700 transition-colors">
                    sales@befach.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#513220' }} />
                  <a href="tel:7057053160" className="text-sm text-black hover:text-gray-700 transition-colors">
                    7057053160
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            © 2025 Supplier Directory. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SupplierDetail;
