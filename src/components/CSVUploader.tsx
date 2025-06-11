
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CSVSupplier } from '@/types/supplier';
import { toast } from '@/hooks/use-toast';

interface CSVUploaderProps {
  onUpload: (data: CSVSupplier[]) => void;
}

export const CSVUploader: React.FC<CSVUploaderProps> = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processCSV = (content: string): CSVSupplier[] => {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV must contain at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data: CSVSupplier[] = [];

    // Column mapping
    const columnMap = {
      name: ['name', 'company_name', 'business_name', 'company'],
      email: ['email', 'contact_email', 'email_address'],
      phone: ['phone', 'phone_number', 'telephone', 'contact_phone'],
      website: ['website', 'url', 'web_address'],
      description: ['description', 'about', 'summary'],
      city: ['city', 'location', 'address'],
      categories: ['categories', 'category', 'industry', 'sectors']
    };

    // Find column indices
    const getColumnIndex = (field: keyof typeof columnMap) => {
      const variations = columnMap[field];
      for (const variation of variations) {
        const index = headers.findIndex(h => h.includes(variation));
        if (index !== -1) return index;
      }
      return -1;
    };

    const indices = {
      name: getColumnIndex('name'),
      email: getColumnIndex('email'),
      phone: getColumnIndex('phone'),
      website: getColumnIndex('website'),
      description: getColumnIndex('description'),
      city: getColumnIndex('city'),
      categories: getColumnIndex('categories')
    };

    if (indices.name === -1) {
      throw new Error('CSV must contain a name/company_name column');
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      
      if (values.length < headers.length) continue;

      const supplier: CSVSupplier = {
        name: values[indices.name] || '',
        email: indices.email !== -1 ? values[indices.email] : undefined,
        phone: indices.phone !== -1 ? values[indices.phone] : undefined,
        website: indices.website !== -1 ? values[indices.website] : undefined,
        description: indices.description !== -1 ? values[indices.description] : undefined,
        city: indices.city !== -1 ? values[indices.city] : undefined,
        categories: indices.categories !== -1 ? values[indices.categories] : undefined
      };

      if (supplier.name) {
        data.push(supplier);
      }
    }

    return data;
  };

  const handleFileRead = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      const content = await file.text();
      const suppliers = processCSV(content);
      
      if (suppliers.length === 0) {
        throw new Error('No valid supplier data found in CSV');
      }

      onUpload(suppliers);
      toast({
        title: "CSV processed successfully",
        description: `Found ${suppliers.length} suppliers to import`,
      });
    } catch (error) {
      toast({
        title: "CSV processing failed",
        description: error instanceof Error ? error.message : "Invalid CSV format",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));

    if (!csvFile) {
      toast({
        title: "Invalid file",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    if (csvFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    handleFileRead(csvFile);
  }, [handleFileRead]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your CSV file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Maximum file size: 5MB
              </p>
            </div>
            
            <Button variant="outline" disabled={isProcessing}>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
              />
              {isProcessing ? 'Processing...' : 'Choose File'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">CSV Format Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Required:</strong> name (or company_name, business_name)</li>
          <li>• <strong>Optional:</strong> email, phone, website, description, city, categories</li>
          <li>• Categories should be comma-separated (e.g., "Technology, Software")</li>
          <li>• First row should contain column headers</li>
        </ul>
      </div>
    </div>
  );
};
