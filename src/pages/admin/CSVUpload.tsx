
import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { CSVUploader } from '@/components/CSVUploader';
import { CSVPreview } from '@/components/CSVPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { CSVSupplier } from '@/types/supplier';
import { toast } from '@/hooks/use-toast';

const CSVUpload = () => {
  const [csvData, setCsvData] = useState<CSVSupplier[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (suppliers: CSVSupplier[]) => {
      const processedSuppliers = suppliers.map(supplier => ({
        ...supplier,
        categories: supplier.categories 
          ? supplier.categories.split(',').map(cat => cat.trim()).filter(Boolean)
          : []
      }));
      return db.bulkAddSuppliers(processedSuppliers);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast({
        title: "Upload successful",
        description: `${data.length} suppliers added successfully`,
      });
      setCsvData([]);
      setIsPreviewMode(false);
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "Failed to upload suppliers",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = useCallback((data: CSVSupplier[]) => {
    setCsvData(data);
    setIsPreviewMode(true);
  }, []);

  const handleConfirmUpload = () => {
    uploadMutation.mutate(csvData);
  };

  const handleCancelUpload = () => {
    setCsvData([]);
    setIsPreviewMode(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CSV Bulk Upload</h1>
          <p className="text-gray-600">Upload multiple suppliers from a CSV file</p>
        </div>

        {!isPreviewMode ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
            </CardHeader>
            <CardContent>
              <CSVUploader onUpload={handleFileUpload} />
            </CardContent>
          </Card>
        ) : (
          <CSVPreview
            data={csvData}
            onConfirm={handleConfirmUpload}
            onCancel={handleCancelUpload}
            isLoading={uploadMutation.isPending}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default CSVUpload;
