import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { ContactSupplierForm } from '@/components/ContactSupplierForm';
import { CatalogueDownloadForm } from '@/components/CatalogueDownloadForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Globe, Mail, Phone, Download, MessageCircle, Package, CheckCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

const SupplierDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isCatalogueFormOpen, setIsCatalogueFormOpen] = useState(false);
  const [showExpandedDescription, setShowExpandedDescription] = useState(false);
  const [hasContactedSupplier, setHasContactedSupplier] = useState(false);
  const [userContactInfo, setUserContactInfo] = useState<any>(null);

  const { data: supplier, isLoading } = useQuery({
    queryKey: ['supplier', slug],
    queryFn: () => db.getSupplierBySlug(slug!),
    enabled: !!slug,
  });

  const handleContactSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    setUserContactInfo(data);
    setHasContactedSupplier(true);
    setIsContactFormOpen(false);
    
    toast({
      title: "Message sent successfully!",
      description: "Your inquiry has been sent to the supplier. They will contact you soon.",
    });
  };

  const handleCatalogueDownload = (data: any) => {
    console.log('Catalogue download requested:', data);
    toast({
      title: "Download request submitted",
      description: "The catalogue download link will be sent to your email.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
            <p className="text-gray-600">The supplier you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const truncatedDescription = supplier.description?.substring(0, 200) + '...';
  const shouldShowReadMore = supplier.description && supplier.description.length > 200;

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Success Banner */}
          {hasContactedSupplier && userContactInfo && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Thank you {userContactInfo.name}, your inquiry has been sent to {supplier.name}. 
                      {userContactInfo.email && ` We'll send updates to ${userContactInfo.email}.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 1: Company Information */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Company Logo */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  {supplier.logo_url ? (
                    <img 
                      src={supplier.logo_url} 
                      alt={`${supplier.name} logo`}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  {/* Industry Categories - Moved above company name */}
                  {supplier.categories && supplier.categories.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                      {supplier.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Company Name */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {supplier.name}
                  </h1>
                  
                  {/* Location */}
                  {supplier.city && (
                    <div className="flex items-center justify-center sm:justify-start text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{supplier.city}</span>
                    </div>
                  )}

                  {/* Partnership Duration */}
                  {supplier.partnership_years && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      <Building2 className="w-4 h-4 mr-2" />
                      {supplier.partnership_years} years partnership
                    </div>
                  )}
                </div>
              </div>

              {/* Company Description */}
              {supplier.description && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">About the Company</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {showExpandedDescription || !shouldShowReadMore ? (
                      <p>{supplier.description}</p>
                    ) : (
                      <p>{truncatedDescription}</p>
                    )}
                    {shouldShowReadMore && (
                      <button
                        onClick={() => setShowExpandedDescription(!showExpandedDescription)}
                        className="text-orange-500 hover:text-orange-600 font-medium mt-2 text-sm"
                      >
                        {showExpandedDescription ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Products & Services */}
          {supplier.products && supplier.products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Package className="w-5 h-5 mr-2" />
                  Products & Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supplier.products.map((product, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{product}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Contact & Catalog Actions - Moved above Contact Information */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 h-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Supplier
                </Button>
                
                {supplier.catalogue_file_url && (
                  <Button 
                    onClick={() => setIsCatalogueFormOpen(true)}
                    variant="outline" 
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-3 h-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalogue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {supplier.website && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <a 
                        href={supplier.website.startsWith('http') ? supplier.website : `https://${supplier.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-600 truncate block"
                      >
                        {supplier.website}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.email && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a 
                        href={`mailto:${supplier.email}`}
                        className="text-sm text-orange-500 hover:text-orange-600 truncate block"
                      >
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a 
                        href={`tel:${supplier.phone}`}
                        className="text-sm text-orange-500 hover:text-orange-600"
                      >
                        {supplier.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactSupplierForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        supplierName={supplier.name}
        onSubmit={handleContactSubmit}
      />

      {/* Catalogue Download Modal */}
      <CatalogueDownloadForm
        isOpen={isCatalogueFormOpen}
        onClose={() => setIsCatalogueFormOpen(false)}
        supplierName={supplier.name}
        onSubmit={handleCatalogueDownload}
      />
    </div>
  );
};

export default SupplierDetail;
