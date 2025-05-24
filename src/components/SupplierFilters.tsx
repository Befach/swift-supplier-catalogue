
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SupplierFilters as FilterType } from '@/types/supplier';

interface SupplierFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: Partial<FilterType>) => void;
  onClearFilters: () => void;
}

const CATEGORIES = [
  'Technology', 'Software', 'Energy', 'Sustainability', 
  'Design', 'Marketing', 'Manufacturing', 'Construction',
  'Healthcare', 'Education', 'Finance', 'Retail'
];

const CITIES = [
  'San Francisco', 'New York', 'Los Angeles', 'Chicago',
  'Austin', 'Seattle', 'Boston', 'Miami', 'Denver', 'Atlanta'
];

export const SupplierFilters: React.FC<SupplierFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...(filters.categories || []), category]
      : (filters.categories || []).filter(c => c !== category);
    
    onFiltersChange({ categories: newCategories });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <Input
            placeholder="Search suppliers..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">City</label>
          <Select 
            value={filters.city || ''} 
            onValueChange={(value) => onFiltersChange({ city: value || undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cities</SelectItem>
              {CITIES.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-medium mb-2 block">Categories</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {CATEGORIES.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={(filters.categories || []).includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
