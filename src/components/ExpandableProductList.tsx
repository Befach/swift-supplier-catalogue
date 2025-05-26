
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableProductListProps {
  products: string[];
  initialLimit?: number;
}

export const ExpandableProductList: React.FC<ExpandableProductListProps> = ({ 
  products, 
  initialLimit = 3 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!products || products.length === 0) {
    return null;
  }

  const displayedProducts = isExpanded ? products : products.slice(0, initialLimit);
  const hasMoreProducts = products.length > initialLimit;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {displayedProducts.map((product, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-md font-medium truncate"
            title={product}
          >
            {product}
          </span>
        ))}
      </div>
      
      {hasMoreProducts && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-auto p-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              Show Less Products
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              Show {products.length - initialLimit} More Products
            </>
          )}
        </Button>
      )}
    </div>
  );
};
