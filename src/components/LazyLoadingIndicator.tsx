
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LazyLoadingIndicatorProps {
  isLoading: boolean;
  hasMoreItems: boolean;
  loadedCount: number;
  totalItems: number;
}

export const LazyLoadingIndicator: React.FC<LazyLoadingIndicatorProps> = ({
  isLoading,
  hasMoreItems,
  loadedCount,
  totalItems
}) => {
  if (!hasMoreItems && loadedCount > 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">All suppliers loaded</h3>
        <p className="text-gray-600">
          You've viewed all {totalItems} suppliers in our directory
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading more suppliers...</h3>
        <p className="text-gray-600">
          Showing {loadedCount} of {totalItems} suppliers
        </p>
      </div>
    );
  }

  return null;
};
