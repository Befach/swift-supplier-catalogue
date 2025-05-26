
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
      
      {/* Hero Section - Minimal & Premium */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
            Our
            <span className="block font-medium text-gray-800 mt-1">Trusted Partners</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover exceptional suppliers who share our commitment to quality and innovation
          </p>
          
          {/* Minimal Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 py-4 text-base border-0 bg-gray-50 rounded-2xl shadow-none focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all duration-300 font-light"
            />
          </div>
        </div>
      </section>

      {/* Minimal Category Filters */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Suppliers Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-3xl p-8 animate-pulse">
                  <div className="w-full h-48 bg-gray-100 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-gray-100 rounded mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-6"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredSuppliers.map((supplier: Supplier) => (
                <div key={supplier.id} className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2">
                  {/* Premium Image Container */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {supplier.logo_url ? (
                      <img 
                        src={supplier.logo_url} 
                        alt={supplier.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                          <span className="text-gray-400 text-2xl font-light">
                            {supplier.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="p-8">
                    {/* Premium Typography */}
                    <div className="mb-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {supplier.name}
                      </h3>
                      
                      {supplier.city && (
                        <div className="flex items-center text-gray-400 mb-4">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm font-light">{supplier.city}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Clean Description */}
                    {supplier.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light line-clamp-2">
                        {supplier.description}
                      </p>
                    )}
                    
                    {/* Minimal Category Tags */}
                    {supplier.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {supplier.categories.slice(0, 2).map(category => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                          >
                            {category}
                          </span>
                        ))}
                        {supplier.categories.length > 2 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-light">
                            +{supplier.categories.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Partnership Info */}
                    <div className="flex items-center text-gray-500 mb-8">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-light">Exporting from {supplier.partnership_years || 5} years</span>
                    </div>
                    
                    {/* Premium CTA */}
                    <Link to={`/supplier/${supplier.slug}`} className="block">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-2xl shadow-none hover:shadow-xl hover:shadow-gray-900/25 transition-all duration-300 group border-0">
                        <span className="mr-2">View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredSuppliers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">No suppliers found</h3>
              <p className="text-gray-500 mb-8 font-light">Try adjusting your search or browse all suppliers</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Suppliers');
                }}
                className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-2xl transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
