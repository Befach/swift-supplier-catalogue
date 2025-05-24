
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';

const SupplierDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: supplier, isLoading, error } = useQuery({
    queryKey: ['supplier', slug],
    queryFn: () => db.getSupplierBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/6 mb-8"></div>
            <div className="bg-white rounded-lg p-8">
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
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
          <Link to="/catalogue">
            <Button>Browse All Suppliers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/catalogue" className="hover:text-blue-600">Suppliers</Link>
            <span>/</span>
            <span className="text-gray-900">{supplier.name}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  {supplier.logo_url ? (
                    <img
                      src={supplier.logo_url}
                      alt={supplier.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-2xl">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl">{supplier.name}</CardTitle>
                    {supplier.city && (
                      <p className="text-gray-600">{supplier.city}</p>
                    )}
                    {supplier.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {supplier.categories.map(category => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {supplier.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700 leading-relaxed">{supplier.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplier.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">
                      <a 
                        href={`mailto:${supplier.email}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {supplier.email}
                      </a>
                    </p>
                  </div>
                )}
                
                {supplier.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900">
                      <a 
                        href={`tel:${supplier.phone}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {supplier.phone}
                      </a>
                    </p>
                  </div>
                )}
                
                {supplier.website && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Website</label>
                    <p className="text-gray-900">
                      <a 
                        href={supplier.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    Contact Supplier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
