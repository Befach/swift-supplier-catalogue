
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';

const AdminDashboard = () => {
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => db.getSuppliers(),
  });

  const totalSuppliers = suppliers.length;
  const citiesCount = new Set(suppliers.map(s => s.city).filter(Boolean)).size;
  const categoriesCount = new Set(suppliers.flatMap(s => s.categories)).size;
  const recentSuppliers = suppliers
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to the supplier management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">
                {totalSuppliers}
              </CardTitle>
              <CardDescription>Total Suppliers</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600">
                {citiesCount}
              </CardTitle>
              <CardDescription>Cities Covered</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-600">
                {categoriesCount}
              </CardTitle>
              <CardDescription>Categories</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Suppliers</CardTitle>
            <CardDescription>Latest suppliers added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSuppliers.length === 0 ? (
              <p className="text-gray-500">No suppliers added yet</p>
            ) : (
              <div className="space-y-4">
                {recentSuppliers.map(supplier => (
                  <div key={supplier.id} className="flex items-center space-x-4">
                    {supplier.logo_url ? (
                      <img
                        src={supplier.logo_url}
                        alt={supplier.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {supplier.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-gray-600">{supplier.city}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(supplier.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
