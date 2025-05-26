
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const getSortLabel = (value: SortOption) => {
    switch (value) {
      case 'name-asc': return 'Alphabetically, A-Z';
      case 'name-desc': return 'Alphabetically, Z-A';
      case 'newest': return 'Newest First';
      case 'oldest': return 'Oldest First';
      case 'city-asc': return 'City, A-Z';
      case 'city-desc': return 'City, Z-A';
      default: return 'Alphabetically, A-Z';
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48 h-10">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Alphabetically, A-Z</SelectItem>
            <SelectItem value="name-desc">Alphabetically, Z-A</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="city-asc">City, A-Z</SelectItem>
            <SelectItem value="city-desc">City, Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="text-sm text-gray-600 text-center sm:text-right">
        <span className="font-medium">{totalItems}</span> suppliers found
      </div>
    </div>
  );
};
