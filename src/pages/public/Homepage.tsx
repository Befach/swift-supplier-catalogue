
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Our Trusted Suppliers
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Quality partners that help us deliver excellence across the globe
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search suppliers by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                  <div className="w-full h-40 sm:h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredSuppliers.map((supplier: Supplier) => (
                <div key={supplier.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {supplier.logo_url ? (
                      <img 
                        src={supplier.logo_url} 
                        alt={supplier.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-gray-400 text-4xl sm:text-5xl">📦</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
                        {supplier.name}
                      </h3>
                      
                      {supplier.city && (
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm truncate">{supplier.city}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    {supplier.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {supplier.description}
                      </p>
                    )}
                    
                    {/* Category Tags */}
                    {supplier.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {supplier.categories.slice(0, 2).map(category => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-orange-50 border border-orange-100 text-orange-700 text-xs rounded-lg font-medium"
                          >
                            {category}
                          </span>
                        ))}
                        {supplier.categories.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg font-medium">
                            +{supplier.categories.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Partnership Duration */}
                    <div className="flex items-center text-gray-500 mb-6">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Exporting from {supplier.partnership_years || 5} years</span>
                    </div>
                    
                    {/* CTA Button */}
                    <Link to={`/supplier/${supplier.slug}`} className="block">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 group">
                        View Details 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredSuppliers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all suppliers.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Suppliers');
                }}
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-200"
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
