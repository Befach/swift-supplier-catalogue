import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/PublicNavbar';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { Supplier } from '@/types/supplier';
import { MapPin, Clock, ArrowRight, Search } from 'lucide-react';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Suppliers');

  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const allSuppliers = await db.getSuppliers();
      return allSuppliers;
    },
  });

  // Generate categories dynamically from supplier data
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    suppliers.forEach(supplier => {
      supplier.categories.forEach(category => {
        uniqueCategories.add(category);
      });
    });
    return ['All Suppliers', ...Array.from(uniqueCategories).sort()];
  }, [suppliers]);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All Suppliers' || 
                           supplier.categories.some(cat => cat === activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Trusted Suppliers
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Quality partners that help us deliver excellence
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search suppliers by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSuppliers.map((supplier: Supplier) => (
                <div key={supplier.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  {/* Placeholder Image */}
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    {supplier.logo_url ? (
                      <img 
                        src={supplier.logo_url} 
                        alt={supplier.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📦</div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{supplier.name}</h3>
                    
                    {supplier.city && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{supplier.city}</span>
                      </div>
                    )}
                    
                    {supplier.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {supplier.description}
                      </p>
                    )}
                    
                    {/* Category Tags */}
                    {supplier.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {supplier.categories.slice(0, 3).map(category => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                        {supplier.categories.length > 3 && (
                          <span className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-full">
                            +{supplier.categories.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Partnership Duration */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">Exporting from {supplier.partnership_years || 5} years</span>
                    </div>
                    
                    <Link to={`/supplier/${supplier.slug}`}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No suppliers found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Suppliers');
                }}
                className="mt-4 text-orange-500 hover:text-orange-600 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
