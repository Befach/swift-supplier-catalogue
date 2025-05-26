
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const SupplierSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Image skeleton */}
      <Skeleton className="w-full h-40 sm:h-48 rounded-xl mb-4" />
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />
      
      {/* Location skeleton */}
      <div className="flex items-center mb-2">
        <Skeleton className="w-4 h-4 mr-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      {/* Description skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      
      {/* Tags skeleton */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-lg" />
      </div>
      
      {/* Partnership years skeleton */}
      <div className="flex items-center mb-6">
        <Skeleton className="w-4 h-4 mr-2" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      {/* Button skeleton */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
};
