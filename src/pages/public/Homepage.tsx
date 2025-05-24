
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicNavbar } from '@/components/PublicNavbar';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { Supplier } from '@/types/supplier';

const Homepage = () => {
  const { data: featuredSuppliers = [], isLoading } = useQuery({
    queryKey: ['featured-suppliers'],
    queryFn: async () => {
      const suppliers = await db.getSuppliers();
      return suppliers.slice(0, 3); // Show first 3 as featured
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect Business Partner
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover and connect with trusted suppliers across industries. 
            Build stronger business relationships with our comprehensive directory.
          </p>
          <Link to="/catalogue">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Browse Suppliers
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-blue-600">Verified Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All suppliers are thoroughly vetted to ensure quality and reliability for your business needs.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-blue-600">Easy Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find exactly what you need with our powerful search and filtering capabilities.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-blue-600">Direct Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect directly with suppliers to discuss your requirements and build partnerships.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Suppliers</h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredSuppliers.map((supplier: Supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {supplier.logo_url && (
                      <img 
                        src={supplier.logo_url} 
                        alt={supplier.name}
                        className="w-16 h-16 object-cover rounded-lg mb-4"
                      />
                    )}
                    <CardTitle>{supplier.name}</CardTitle>
                    <CardDescription>{supplier.city}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {supplier.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {supplier.categories.slice(0, 2).map(category => (
                        <span 
                          key={category}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <Link to={`/supplier/${supplier.slug}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Partner?</h2>
          <p className="text-xl mb-8">
            Browse our complete directory of verified suppliers
          </p>
          <Link to="/catalogue">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              View All Suppliers
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
