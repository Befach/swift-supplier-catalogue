
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { db } from '@/lib/firebase';
import { MapPin, Clock, Mail, Phone, Globe, FileText } from 'lucide-react';

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
  console.log('Catalogue button text:', supplier?.catalogue_button);
  console.log('Catalogue file URL:', supplier?.catalogue_file_url);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-orange-500">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-orange-500">Suppliers</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{supplier.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        {/* Hero Image */}
        <div className="w-full h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
          {supplier.logo_url ? (
            <img
              src={supplier.logo_url}
              alt={supplier.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-6xl">🏢</div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{supplier.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                {supplier.city && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{supplier.city}</span>
                  </div>
                )}
                {supplier.partnership_years && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Exporting from {supplier.partnership_years} years</span>
                  </div>
                )}
              </div>

              {supplier.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {supplier.categories.map(category => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {supplier.description && (
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">{supplier.description}</p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  {supplier.name} leads the industry in sustainable solutions and high-quality products. Our 
                  innovative offerings help businesses achieve their goals while maintaining excellence and 
                  integrity. We source materials from trusted suppliers and ensure a fully transparent supply 
                  chain. With over {supplier.partnership_years || 10} years of dedicated partnership, we've helped hundreds of businesses 
                  transition to better solutions without compromising on quality or efficiency. Our team of experts is 
                  always available to consult on your specific needs.
                </p>
              </div>
            )}

            {/* Key Products & Services */}
            {supplier.products && supplier.products.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Products & Services</h2>
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {supplier.products.map((product, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{product}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Contact Sidebar */}
          <div>
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplier.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <a 
                        href={`mailto:${supplier.email}`}
                        className="text-orange-500 hover:text-orange-600 underline"
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
                        className="text-orange-500 hover:text-orange-600 underline"
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
                
                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                    Contact This Supplier
                  </Button>
                  
                  {(supplier.catalogue_button || supplier.catalogue_file_url) && (
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium" 
                      size="lg"
                      onClick={handleCatalogueDownload}
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>Download Catalogue</span>
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
              <div className="space-y-2 text-sm text-gray-600">
                <p>3rd Road Number 2 Venkat Nagar Banjara Hills</p>
                <p>3rd floor, Luxor Park</p>
                <p>500034 Hyderabad TS, India</p>
                <a href="mailto:sales@befach.com" className="text-orange-500 hover:text-orange-600">
                  sales@befach.com
                </a>
                <p>7057053160</p>
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
