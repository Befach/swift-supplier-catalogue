
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Supplier } from '@/types/supplier';
import { X, Plus } from 'lucide-react';

interface SupplierFormProps {
  initialData?: Partial<Supplier>;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    description: initialData?.description || '',
    city: initialData?.city || '',
    categories: initialData?.categories?.join(', ') || '',
    logo_url: initialData?.logo_url || '',
    partnership_years: initialData?.partnership_years || 10,
    catalogue_file_url: initialData?.catalogue_file_url || ''
  });

  const [products, setProducts] = useState<string[]>(initialData?.products || []);
  const [newProduct, setNewProduct] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categories = formData.categories
      .split(',')
      .map(cat => cat.trim())
      .filter(cat => cat.length > 0);

    onSubmit({
      ...formData,
      categories,
      products: products.filter(product => product.trim().length > 0)
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct('');
    }
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Company name"
            />
          </div>
          
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="City location"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="contact@company.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1-555-0123"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://company.com"
          />
        </div>

        <div>
          <Label htmlFor="logo_url">Logo URL</Label>
          <Input
            id="logo_url"
            type="url"
            value={formData.logo_url}
            onChange={(e) => handleChange('logo_url', e.target.value)}
            placeholder="https://example.com/logo.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="partnership_years">Partnership Duration (Years)</Label>
            <Input
              id="partnership_years"
              type="number"
              value={formData.partnership_years}
              onChange={(e) => handleChange('partnership_years', parseInt(e.target.value) || 10)}
              placeholder="10"
              min="1"
            />
          </div>
          
          <div>
            <Label htmlFor="catalogue_file_url">Catalogue File URL</Label>
            <Input
              id="catalogue_file_url"
              type="url"
              value={formData.catalogue_file_url}
              onChange={(e) => handleChange('catalogue_file_url', e.target.value)}
              placeholder="https://example.com/catalogue.pdf"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="categories">Categories</Label>
          <Input
            id="categories"
            value={formData.categories}
            onChange={(e) => handleChange('categories', e.target.value)}
            placeholder="IT Equipment, Technology, Software (comma separated)"
          />
        </div>

        <div>
          <Label htmlFor="products">Products & Services</Label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Add a product or service..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              />
              <Button type="button" onClick={addProduct} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {products.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1 text-sm">{product}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProduct(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief description of the company..."
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t bg-white sticky bottom-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !formData.name.trim()}>
            {isLoading ? 'Saving...' : 'Save Supplier'}
          </Button>
        </div>
      </form>
    </div>
  );
};
