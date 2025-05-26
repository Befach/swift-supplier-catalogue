
import React from 'react';
import { Filter } from 'lucide-react';

export type SortOption = 'name-asc' | 'name-desc' | 'newest' | 'oldest' | 'city-asc' | 'city-desc';

interface SuppliersSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalItems: number;
}

export const SuppliersSort: React.FC<SuppliersSortProps> = ({
  sortBy,
  onSortChange,
  totalItems
}) => {
  return (
    <div className="flex items-center justify-between py-4 px-4 bg-gray-50 border-y border-gray-200">
      <div className="flex items-center gap-2 text-orange-600">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter and sort</span>
      </div>
      
      <div className="text-sm text-gray-600">
        <span className="font-medium">{totalItems}</span> products
      </div>
    </div>
  );
};
