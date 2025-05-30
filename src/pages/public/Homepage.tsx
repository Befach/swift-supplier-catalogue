
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/PublicNavbar';
import { SupplierSkeleton } from '@/components/SupplierSkeleton';
import { SuppliersPagination } from '@/components/SuppliersPagination';
import { SuppliersSort, SortOption } from '@/components/SuppliersSort';
import { ServicesSection } from '@/components/ServicesSection';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase';
import { Supplier } from '@/types/supplier';
import { MapPin, Clock, ArrowRight, Search, ChevronDown, ChevronUp } from 'lucide-react';

const ITEMS_PER_PAGE = 12;
const INITIAL_CATEGORIES_DISPLAY = 8;

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Suppliers');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showAllCategories, setShowAllCategories] = useState(false);

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

  // Categories to display based on show more state
  const displayedCategories = useMemo(() => {
    if (showAllCategories) {
      return categories;
    }
    return categories.slice(0, INITIAL_CATEGORIES_DISPLAY);
  }, [categories, showAllCategories]);

  const hasMoreCategories = categories.length > INITIAL_CATEGORIES_DISPLAY;

  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All Suppliers' || 
                             supplier.categories.some(cat => cat === activeCategory);
      
      return matchesSearch && matchesCategory;
    });

    // Sort suppliers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'city-asc':
          return (a.city || '').localeCompare(b.city || '');
        case 'city-desc':
          return (b.city || '').localeCompare(a.city || '');
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [suppliers, searchTerm, activeCategory, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedSuppliers.length / ITEMS_PER_PAGE);
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedSuppliers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedSuppliers, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PublicNavbar />
      
      {/* Hero Section - Improved mobile spacing */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Our Trusted Suppliers
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Quality partners that help us deliver excellence across the globe
          </p>
          
          {/* Search Bar - Better mobile sizing */}
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

      {/* Services Section */}
      <ServicesSection />

      {/* Category Filters - Improved with More button */}
      <section className="bg-white py-4 sm:py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {displayedCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
            
            {hasMoreCategories && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:border-gray-400 flex items-center gap-1"
              >
                {showAllCategories ? (
                  <>
                    Less
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    More ({categories.length - INITIAL_CATEGORIES_DISPLAY})
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Sort Controls - Better mobile display */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <SuppliersSort
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalItems={filteredAndSortedSuppliers.length}
          />
        </div>
      </section>

      {/* Suppliers Grid - Optimized for mobile */}
      <section className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {isDataLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <SupplierSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedSuppliers.map((supplier: Supplier) => (
                  <Link 
                    key={supplier.id} 
                    to={`/supplier/${supplier.slug}`}
                    className="block group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Image Container - Better mobile aspect ratio */}
                    <div className="relative w-full h-36 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
                    
                    <div className="p-4 sm:p-5 lg:p-6">
                      {/* Header - Better mobile typography */}
                      <div className="mb-3">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
                          {supplier.name}
                        </h3>
                        
                        {supplier.city && (
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span className="text-xs sm:text-sm truncate">{supplier.city}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Description - Better mobile readability */}
                      {supplier.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                          {supplier.description}
                        </p>
                      )}
                      
                      {/* Category Tags - Improved mobile layout */}
                      {supplier.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
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
                      <div className="flex items-center text-gray-500 mb-4 sm:mb-6">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Exporting from {supplier.partnership_years || 5} years</span>
                      </div>
                      
                      {/* CTA Button - Better mobile touch target */}
                      <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 group flex items-center justify-center min-h-[44px]">
                        <span className="text-sm sm:text-base">View Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <SuppliersPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredAndSortedSuppliers.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              )}
            </>
          )}
          
          {/* Empty State - Better mobile layout */}
          {!isDataLoading && filteredAndSortedSuppliers.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-400 text-5xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">Try adjusting your search criteria or browse all suppliers.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Suppliers');
                }}
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-200 min-h-[44px]"
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
