
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableCategoryListProps {
  categories: string[];
  initialLimit?: number;
}

export const ExpandableCategoryList: React.FC<ExpandableCategoryListProps> = ({ 
  categories, 
  initialLimit = 3 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayedCategories = isExpanded ? categories : categories.slice(0, initialLimit);
  const hasMoreCategories = categories.length > initialLimit;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {displayedCategories.map(category => (
          <span
            key={category}
            className="px-2 py-1 bg-orange-50 border border-orange-100 text-orange-700 text-xs rounded-lg font-medium whitespace-nowrap"
          >
            {category}
          </span>
        ))}
        {hasMoreCategories && !isExpanded && (
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg font-medium whitespace-nowrap">
            +{categories.length - initialLimit}
          </span>
        )}
      </div>
      
      {hasMoreCategories && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-auto p-1 text-xs text-orange-600 hover:text-orange-800 hover:bg-orange-50"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              Show All Categories
            </>
          )}
        </Button>
      )}
    </div>
  );
};
