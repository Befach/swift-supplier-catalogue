import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactSupplierForm } from '@/components/ContactSupplierForm';
import { CatalogueDownloadForm } from '@/components/CatalogueDownloadForm';
import { ContactGateModal } from '@/components/ContactGateModal';
import { db } from '@/lib/firebase';
import { MapPin, Clock, Mail, Phone, Globe, FileText, ArrowLeft, Package, Building, Users, Calendar, Lock, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SupplierDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isCatalogueFormOpen, setIsCatalogueFormOpen] = useState(false);
  const [isContactGateOpen, setIsContactGateOpen] = useState(false);
  const [hasContactedSupplier, setHasContactedSupplier] = useState(false);
  const [contactFormData, setContactFormData] = useState<any>(null);
  const [catalogueDetails, setCatalogueDetails] = useState<any>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  const { data: supplier, isLoading, error } = useQuery({
    queryKey: ['supplier', slug],
    queryFn: () => db.getSupplierBySlug(slug!),
    enabled: !!slug,
  });

  // Load state from sessionStorage on mount
  useEffect(() => {
    if (slug) {
      const savedState = sessionStorage.getItem(`supplier-contact-${slug}`);
      if (savedState) {
        const { hasContacted, formData } = JSON.parse(savedState);
        setHasContactedSupplier(hasContacted);
        setContactFormData(formData);
      }
    }
  }, [slug]);

  // Save state to sessionStorage
  const saveState = (hasContacted: boolean, formData: any) => {
    if (slug) {
      sessionStorage.setItem(`supplier-contact-${slug}`, JSON.stringify({
        hasContacted,
        formData
      }));
    }
  };

  const handleContactButtonClick = () => {
    if (!hasContactedSupplier) {
      setIsContactGateOpen(true);
    } else {
      setIsContactFormOpen(true);
    }
  };

  const handleContactGateClose = () => {
    setIsContactGateOpen(false);
  };

  const handleProceedToContact = () => {
    setIsContactGateOpen(false);
    setIsContactFormOpen(true);
  };

  const handleContactFormSubmit = (data: any) => {
    setContactFormData(data);
    setHasContactedSupplier(true);
    setShowSuccessBanner(true);
    saveState(true, data);
    
    toast({
      title: "Contact Submitted Successfully!",
      description: `Your message has been sent to ${supplier?.name}. You now have access to contact details.`,
    });
    
    setIsContactFormOpen(false);
  };

  const handleCatalogueFormSubmit = (data: any) => {
    setCatalogueDetails(data);
    setIsCatalogueFormOpen(false);
  };

  const dismissSuccessBanner = () => {
    setShowSuccessBanner(false);
  };

  console.log('Supplier data:', supplier);
  console.log('Has contacted:', hasContactedSupplier);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicNavbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
          <p className="text-gray-600 mb-6">
            The supplier you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">Browse All Suppliers</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Truncate description for preview
  const getPreviewDescription = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(' ') + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Directory Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Link>

        {/* Success Banner */}
        {showSuccessBanner && hasContactedSupplier && contactFormData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 mb-6 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Thank you {contactFormData.name}! 🎉
                </h3>
                <p className="text-green-700 mb-4">
                  You now have access to {supplier.name}'s contact details. 
                  Your message has been sent to them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Your Email: </span>
                    <span className="text-green-900">{contactFormData.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Company: </span>
                    <span className="text-green-900">{contactFormData.company || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissSuccessBanner}
                className="text-green-600 hover:text-green-800 hover:bg-green-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Catalogue Details Display */}
        {catalogueDetails && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Catalogue Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-blue-700">Name:</p>
                <p className="text-blue-900">{catalogueDetails.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Email:</p>
                <p className="text-blue-900">{catalogueDetails.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Company:</p>
                <p className="text-blue-900">{catalogueDetails.company || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Phone:</p>
                <p className="text-blue-900">{catalogueDetails.phone || 'Not provided'}</p>
              </div>
            </div>
            <p className="text-sm text-blue-700 mt-4">
              The catalogue from {supplier.name} will be sent to your email address shortly.
            </p>
          </div>
        )}

        {/* Supplier Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 flex-1 w-full">
              {supplier.logo_url ? (
                <img
                  src={supplier.logo_url}
                  alt={supplier.name}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0">
                  <span className="text-gray-400 text-2xl">🏢</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{supplier.name}</h1>
                
                {supplier.city && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{supplier.city}</span>
                  </div>
                )}
                
                {supplier.description && (
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {supplier.description}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto lg:min-w-fit">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white flex-1 sm:flex-none text-sm md:text-base" 
                onClick={handleContactButtonClick}
              >
                <Mail className="w-4 h-4 mr-2" />
                {hasContactedSupplier ? 'Contact Again' : 'Contact Supplier'}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-orange-200 text-orange-500 hover:bg-orange-50 flex-1 sm:flex-none text-sm md:text-base" 
                onClick={() => setIsCatalogueFormOpen(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download Catalogue
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products & Services - Always visible */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <Package className="w-5 h-5 mr-2 text-orange-500" />
                  Products & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supplier.products && supplier.products.length > 0 ? (
                  <ul className="space-y-3">
                    {supplier.products.map((product, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed text-sm md:text-base">{product}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm md:text-base">No specific products listed.</p>
                )}
              </CardContent>
            </Card>

            {/* Industry Categories - Always visible */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Industry Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supplier.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {supplier.categories.map(category => (
                      <span
                        key={category}
                        className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-sm rounded-lg font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm md:text-base">No categories specified.</p>
                )}
              </CardContent>
            </Card>

            {/* Additional Description - Always visible */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  About {supplier.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  {supplier.name} leads the industry in sustainable solutions and high-quality products. Our 
                  innovative offerings help businesses achieve their goals while maintaining excellence and 
                  integrity. We source materials from trusted suppliers and ensure a fully transparent supply 
                  chain.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  With over {supplier.partnership_years || 10} years of dedicated partnership, we've helped hundreds of businesses 
                  transition to better solutions without compromising on quality or efficiency. Our team of experts is 
                  always available to consult on your specific needs.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            {/* Contact Information - Only this is gated */}
            <Card className={`bg-white shadow-sm border border-gray-200 transition-all duration-500 ${!hasContactedSupplier ? 'opacity-50' : 'animate-fade-in'}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  Contact Information
                  {!hasContactedSupplier && <Lock className="w-4 h-4 ml-2 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!hasContactedSupplier ? (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm mb-4">Fill contact form to access supplier contact details</p>
                    <Button onClick={handleContactButtonClick} size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Contact to View
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {supplier.email && (
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base" 
                          size="lg"
                          onClick={() => window.location.href = `mailto:${supplier.email}`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      )}
                      
                      {supplier.phone && (
                        <Button 
                          variant="outline" 
                          className="w-full border-orange-200 text-orange-500 hover:bg-orange-50 text-sm md:text-base" 
                          size="lg"
                          onClick={() => window.location.href = `tel:${supplier.phone}`}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {supplier.phone}
                        </Button>
                      )}
                      
                      {supplier.website && (
                        <Button 
                          variant="outline" 
                          className="w-full border-orange-200 text-orange-500 hover:bg-orange-50 text-sm md:text-base" 
                          size="lg"
                          onClick={() => window.open(supplier.website, '_blank')}
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Visit Website
                        </Button>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-200 space-y-3">
                      {supplier.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                          <span className="break-all">{supplier.email}</span>
                        </div>
                      )}
                      
                      {supplier.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                          <span>{supplier.phone}</span>
                        </div>
                      )}
                      
                      {supplier.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                          <span className="break-all">{supplier.website.replace('https://', '').replace('http://', '')}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Company Details - Always visible */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span>Founded</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">2015</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span>Employees</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">50-100</span>
                </div>

                {supplier.partnership_years && (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                      <span>Partnership</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{supplier.partnership_years} years</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span>Location</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{supplier.city || 'Not specified'}</span>
                </div>

                {supplier.catalogue_file_url && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      className="w-full border-orange-200 text-orange-500 hover:bg-orange-50 text-sm md:text-base" 
                      onClick={() => setIsCatalogueFormOpen(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Catalogue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Supplier Directory</h3>
              <p className="text-gray-600 text-sm">
                Find trusted suppliers for your business needs. Our directory features quality partners that help deliver excellence.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-orange-500 text-sm">Home</Link>
                <Link to="/about" className="block text-gray-600 hover:text-orange-500 text-sm">About Us</Link>
                <Link to="/contact" className="block text-gray-600 hover:text-orange-500 text-sm">Contact</Link>
                <Link to="/privacy" className="block text-gray-600 hover:text-orange-500 text-sm">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#513220' }} />
                  <div className="text-sm text-black">
                    <p className="font-medium">3rd floor, Luxor Park, Road No.2 Banjara Hills</p>
                    <p>Hyderabad, Telangana, 500034</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#513220' }} />
                  <a href="mailto:sales@befach.com" className="text-sm text-black hover:text-gray-700 transition-colors">
                    sales@befach.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#513220' }} />
                  <a href="tel:7057053160" className="text-sm text-black hover:text-gray-700 transition-colors">
                    7057053160
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            © 2025 Supplier Directory. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Contact Gate Modal */}
      <ContactGateModal
        isOpen={isContactGateOpen}
        onClose={handleContactGateClose}
        onProceed={handleProceedToContact}
        supplierName={supplier?.name || ''}
      />

      {/* Contact Form Modal */}
      <ContactSupplierForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        supplierName={supplier?.name || ''}
        onSubmit={handleContactFormSubmit}
      />

      {/* Catalogue Download Form Modal */}
      <CatalogueDownloadForm 
        isOpen={isCatalogueFormOpen}
        onClose={() => setIsCatalogueFormOpen(false)}
        supplierName={supplier?.name || ''}
        onSubmit={handleCatalogueFormSubmit}
      />
    </div>
  );
};

export default SupplierDetail;
