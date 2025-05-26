
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/PublicNavbar';
import { SupplierSkeleton } from '@/components/SupplierSkeleton';
import { LazyLoadingIndicator } from '@/components/LazyLoadingIndicator';
import { ExpandableProductList } from '@/components/ExpandableProductList';
import { ExpandableCategoryList } from '@/components/ExpandableCategoryList';
import { useLazyLoading } from '@/hooks/useLazyLoading';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { Supplier } from '@/types/supplier';
import { MapPin, Clock, ArrowRight, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Suppliers');

  const { data: suppliers = [], isLoading: isDataLoading } = useQuery({
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

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All Suppliers' || 
                             supplier.categories.some(cat => cat === activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [suppliers, searchTerm, activeCategory]);

  const {
    displayedItems: displayedSuppliers,
    isLoading: isLazyLoading,
    hasMoreItems,
    loadMoreRef,
    totalItems,
    loadedCount
  } = useLazyLoading({
    initialData: filteredSuppliers,
    pageSize: ITEMS_PER_PAGE,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Our Trusted Suppliers
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Quality partners that help us deliver excellence across the globe
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6 sm:mb-8">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 py-2.5 sm:py-3 text-sm sm:text-base border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white py-4 sm:py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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
      <section className="py-6 sm:py-8 lg:py-12 xl:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {isDataLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <SupplierSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedSuppliers.map((supplier: Supplier) => (
                  <div key={supplier.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Image Container */}
                    <div className="relative w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex-shrink-0">
                      {supplier.logo_url ? (
                        <img 
                          src={supplier.logo_url} 
                          alt={supplier.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-gray-400 text-3xl sm:text-4xl lg:text-5xl">📦</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-grow">
                      {/* Header */}
                      <div className="mb-3 flex-shrink-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 leading-tight">
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
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-shrink-0">
                          {supplier.description}
                        </p>
                      )}
                      
                      {/* Category Tags */}
                      {supplier.categories.length > 0 && (
                        <div className="mb-3 sm:mb-4 flex-shrink-0">
                          <ExpandableCategoryList 
                            categories={supplier.categories} 
                            initialLimit={2}
                          />
                        </div>
                      )}

                      {/* Products Display */}
                      {supplier.products && supplier.products.length > 0 && (
                        <div className="mb-3 sm:mb-4 flex-shrink-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Products:</h4>
                          <ExpandableProductList 
                            products={supplier.products} 
                            initialLimit={2}
                          />
                        </div>
                      )}
                      
                      {/* Partnership Duration */}
                      <div className="flex items-center text-gray-500 mb-4 sm:mb-6 flex-shrink-0">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Exporting from {supplier.partnership_years || 5} years</span>
                      </div>
                      
                      {/* CTA Button - This will be pushed to bottom */}
                      <div className="mt-auto">
                        <Link to={`/supplier/${supplier.slug}`} className="block">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 group">
                            View Details 
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lazy Loading Indicator and Observer Target */}
              <div ref={loadMoreRef} className="mt-6 sm:mt-8">
                <LazyLoadingIndicator
                  isLoading={isLazyLoading}
                  hasMoreItems={hasMoreItems}
                  loadedCount={loadedCount}
                  totalItems={totalItems}
                />
              </div>
            </>
          )}
          
          {!isDataLoading && filteredSuppliers.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Try adjusting your search criteria or browse all suppliers.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Suppliers');
                }}
                className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200"
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
