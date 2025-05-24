
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { SupplierCard } from '@/components/SupplierCard';
import { SupplierFilters } from '@/components/SupplierFilters';
import { db } from '@/lib/firebase';
import { SupplierFilters as FilterType } from '@/types/supplier';
import { useDebounce } from '@/hooks/useDebounce';

const Catalogue = () => {
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    categories: [],
    city: '',
    page: 1,
    limit: 20
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const { data: suppliers = [], isLoading, error } = useQuery({
    queryKey: ['suppliers', { ...filters, search: debouncedSearch }],
    queryFn: () => db.getSuppliers({ ...filters, search: debouncedSearch }),
  });

  const updateFilters = useCallback((newFilters: Partial<FilterType>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      categories: [],
      city: '',
      page: 1,
      limit: 20
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Directory</h1>
          <p className="text-gray-600">
            Discover trusted suppliers for your business needs
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SupplierFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Suppliers Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading suppliers. Please try again.</p>
              </div>
            ) : suppliers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No suppliers found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {suppliers.length} supplier{suppliers.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {suppliers.map(supplier => (
                    <SupplierCard key={supplier.id} supplier={supplier} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
