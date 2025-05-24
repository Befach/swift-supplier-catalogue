
// Firebase configuration (using environment variables for production)
// For demo purposes, we'll use placeholder values
export const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "supplier-management-demo.firebaseapp.com",
  projectId: "supplier-management-demo",
  storageBucket: "supplier-management-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Mock Firebase implementation for demo
export class MockFirestore {
  private suppliers: any[] = [
    {
      id: "1",
      name: "Tech Solutions Inc",
      email: "contact@techsolutions.com",
      phone: "+1-555-0123",
      website: "https://techsolutions.com",
      description: "Leading provider of innovative technology solutions for businesses worldwide.",
      city: "San Francisco",
      categories: ["Technology", "Software"],
      logo_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop",
      slug: "tech-solutions-inc",
      created_at: new Date("2024-01-15"),
      updated_at: new Date("2024-01-15")
    },
    {
      id: "2",
      name: "Green Energy Co",
      email: "info@greenenergy.com",
      phone: "+1-555-0456",
      website: "https://greenenergy.com",
      description: "Sustainable energy solutions for a greener future.",
      city: "Austin",
      categories: ["Energy", "Sustainability"],
      logo_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&h=200&fit=crop",
      slug: "green-energy-co",
      created_at: new Date("2024-01-20"),
      updated_at: new Date("2024-01-20")
    },
    {
      id: "3",
      name: "Design Studio Pro",
      email: "hello@designstudio.com",
      phone: "+1-555-0789",
      website: "https://designstudio.com",
      description: "Creative design agency specializing in brand identity and digital experiences.",
      city: "New York",
      categories: ["Design", "Marketing"],
      logo_url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&h=200&fit=crop",
      slug: "design-studio-pro",
      created_at: new Date("2024-02-01"),
      updated_at: new Date("2024-02-01")
    }
  ];

  async getSuppliers(filters?: any) {
    let filtered = [...this.suppliers];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.city.toLowerCase().includes(search)
      );
    }
    
    if (filters?.categories?.length) {
      filtered = filtered.filter(s => 
        s.categories.some(cat => filters.categories.includes(cat))
      );
    }
    
    if (filters?.city) {
      filtered = filtered.filter(s => s.city === filters.city);
    }
    
    return filtered;
  }

  async getSupplierBySlug(slug: string) {
    return this.suppliers.find(s => s.slug === slug);
  }

  async addSupplier(supplier: any) {
    const newSupplier = {
      ...supplier,
      id: Date.now().toString(),
      slug: supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      created_at: new Date(),
      updated_at: new Date()
    };
    this.suppliers.push(newSupplier);
    return newSupplier;
  }

  async updateSupplier(id: string, updates: any) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.suppliers[index] = {
        ...this.suppliers[index],
        ...updates,
        updated_at: new Date()
      };
      return this.suppliers[index];
    }
    throw new Error('Supplier not found');
  }

  async deleteSupplier(id: string) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.suppliers.splice(index, 1);
      return true;
    }
    throw new Error('Supplier not found');
  }

  async bulkAddSuppliers(suppliers: any[]) {
    const newSuppliers = suppliers.map(supplier => ({
      ...supplier,
      id: Date.now().toString() + Math.random(),
      slug: supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      created_at: new Date(),
      updated_at: new Date()
    }));
    this.suppliers.push(...newSuppliers);
    return newSuppliers;
  }
}

export const db = new MockFirestore();
