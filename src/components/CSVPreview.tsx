
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CSVSupplier } from '@/types/supplier';

interface CSVPreviewProps {
  data: CSVSupplier[];
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const CSVPreview: React.FC<CSVPreviewProps> = ({
  data,
  onConfirm,
  onCancel,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Preview Import Data</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {data.length} suppliers ready to import
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isLoading}>
              {isLoading ? 'Importing...' : 'Confirm Import'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Categories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((supplier, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.email || '-'}</TableCell>
                  <TableCell>{supplier.phone || '-'}</TableCell>
                  <TableCell>{supplier.city || '-'}</TableCell>
                  <TableCell>{supplier.categories || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {data.length > 10 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing first 10 of {data.length} suppliers
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
