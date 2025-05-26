
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Supplier } from '@/types/supplier';
import { FileText } from 'lucide-react';

interface SupplierTableProps {
  suppliers: Supplier[];
  isLoading: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  isLoading,
  onEdit,
  onDelete
}) => {
  const handleCatalogueDownload = (supplier: Supplier) => {
    if (supplier.catalogue_file_url) {
      window.open(supplier.catalogue_file_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No suppliers found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map(supplier => (
            <TableRow key={supplier.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  {supplier.logo_url ? (
                    <img
                      src={supplier.logo_url}
                      alt={supplier.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-semibold">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    {supplier.website && (
                      <p className="text-sm text-gray-500">{supplier.website}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{supplier.city || '-'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {supplier.categories.slice(0, 2).map(category => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                  {supplier.categories.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{supplier.categories.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {supplier.email && (
                    <p className="text-gray-600">{supplier.email}</p>
                  )}
                  {supplier.phone && (
                    <p className="text-gray-600">{supplier.phone}</p>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(supplier.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(supplier)}
                  >
                    Edit
                  </Button>
                  {(supplier.catalogue_button || supplier.catalogue_file_url) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCatalogueDownload(supplier)}
                      className="text-orange-500 border-orange-500 hover:bg-orange-50"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {supplier.catalogue_button || `Download "${supplier.name}" Catalogue`}
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(supplier.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
