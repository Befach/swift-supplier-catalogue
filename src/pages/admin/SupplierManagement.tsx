
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { SupplierTable } from '@/components/SupplierTable';
import { SupplierForm } from '@/components/SupplierForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { db } from '@/lib/firebase';
import { Supplier } from '@/types/supplier';
import { toast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';

const SupplierManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ['suppliers', debouncedSearch],
    queryFn: () => db.getSuppliers({ search: debouncedSearch }),
  });

  const addMutation = useMutation({
    mutationFn: (newSupplier: Partial<Supplier>) => db.addSupplier(newSupplier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Supplier added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add supplier",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Supplier> & { id: string }) => 
      db.updateSupplier(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      setEditingSupplier(null);
      toast({
        title: "Success",
        description: "Supplier updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update supplier",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => db.deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast({
        title: "Success",
        description: "Supplier deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete supplier",
        variant: "destructive",
      });
    },
  });

  const handleAdd = (supplierData: Partial<Supplier>) => {
    addMutation.mutate(supplierData);
  };

  const handleUpdate = (supplierData: Partial<Supplier>) => {
    if (editingSupplier?.id) {
      updateMutation.mutate({ ...supplierData, id: editingSupplier.id });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600">Manage your supplier directory</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Supplier</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
              </DialogHeader>
              <SupplierForm
                onSubmit={handleAdd}
                onCancel={() => setIsAddDialogOpen(false)}
                isLoading={addMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suppliers ({suppliers.length})</CardTitle>
            <div className="flex justify-between items-center">
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <SupplierTable
              suppliers={suppliers}
              isLoading={isLoading}
              onEdit={setEditingSupplier}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingSupplier} onOpenChange={() => setEditingSupplier(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Supplier</DialogTitle>
            </DialogHeader>
            {editingSupplier && (
              <SupplierForm
                initialData={editingSupplier}
                onSubmit={handleUpdate}
                onCancel={() => setEditingSupplier(null)}
                isLoading={updateMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default SupplierManagement;
