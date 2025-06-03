
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lock, Mail } from 'lucide-react';

interface ContactGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  supplierName: string;
}

export const ContactGateModal = ({ isOpen, onClose, onProceed, supplierName }: ContactGateModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-semibold text-gray-900">
            <Lock className="w-6 h-6 mr-3 text-orange-500" />
            Contact Required to View Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Unlock Full Supplier Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access detailed supplier information including contact details, full product listings, 
              and company information by filling our contact form. This connects you directly with{' '}
              <span className="font-medium text-gray-900">{supplierName}</span> and unlocks all restricted content.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-orange-800 mb-2">What you'll get access to:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Direct contact information (email, phone, website)</li>
              <li>• Complete products and services listing</li>
              <li>• Detailed company information</li>
              <li>• Catalogue download access</li>
              <li>• Direct communication with the supplier</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button 
              onClick={onProceed} 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              <Mail className="w-4 h-4 mr-2" />
              Fill Contact Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
