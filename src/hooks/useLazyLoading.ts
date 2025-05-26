
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLazyLoadingProps<T> {
  initialData: T[];
  pageSize: number;
  hasMore?: boolean;
}

export function useLazyLoading<T>({ initialData, pageSize, hasMore = true }: UseLazyLoadingProps<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(hasMore);
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initialize with first batch
  useEffect(() => {
    const initialBatch = initialData.slice(0, pageSize);
    setDisplayedItems(initialBatch);
    setHasMoreItems(initialData.length > pageSize);
  }, [initialData, pageSize]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreItems) return;

    setIsLoading(true);
    
    // Simulate API delay for smooth UX
    setTimeout(() => {
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      const nextBatch = initialData.slice(startIndex, endIndex);
      
      if (nextBatch.length > 0) {
        setDisplayedItems(prev => [...prev, ...nextBatch]);
        setCurrentPage(prev => prev + 1);
      }
      
      setHasMoreItems(endIndex < initialData.length);
      setIsLoading(false);
    }, 800);
  }, [currentPage, pageSize, initialData, isLoading, hasMoreItems]);

  // Set up Intersection Observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreItems && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMoreItems, isLoading]);

  return {
    displayedItems,
    isLoading,
    hasMoreItems,
    loadMoreRef,
    totalItems: initialData.length,
    loadedCount: displayedItems.length
  };
}
