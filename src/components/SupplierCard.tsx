
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Supplier } from '@/types/supplier';
import { Clock } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {supplier.logo_url ? (
              <img
                src={supplier.logo_url}
                alt={supplier.name}
                className="w-12 h-12 rounded-lg object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {supplier.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{supplier.name}</CardTitle>
              {supplier.city && (
                <p className="text-sm text-gray-600">{supplier.city}</p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {supplier.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {supplier.description}
          </p>
        )}
        
        {supplier.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {supplier.categories.slice(0, 3).map(category => (
              <span
                key={category}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
            {supplier.categories.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{supplier.categories.length - 3} more
              </span>
            )}
          </div>
        )}

        {supplier.partnership_years && (
          <div className="flex items-center text-gray-600 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">Exporting from {supplier.partnership_years} years</span>
          </div>
        )}
        
        <Link to={`/supplier/${supplier.slug}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
