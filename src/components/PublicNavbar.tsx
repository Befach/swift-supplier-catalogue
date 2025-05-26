
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';

export const PublicNavbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/', label: 'Home' },
    { href: 'https://befach.com/pages/about-us', label: 'About' },
    { href: 'https://befach.com/policies/contact-information', label: 'Contact' },
  ];

  const NavigationLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center space-x-8'}`}>
      {navigationItems.map((item) => (
        item.path ? (
          <Link 
            key={item.label}
            to={item.path} 
            onClick={onLinkClick}
            className={`transition-colors ${
              isActive(item.path) 
                ? 'text-orange-500 font-medium' 
                : 'text-gray-600 hover:text-orange-500'
            } ${isMobile ? 'text-lg py-2' : ''}`}
          >
            {item.label}
          </Link>
        ) : (
          <a 
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            className={`text-gray-600 hover:text-orange-500 transition-colors ${isMobile ? 'text-lg py-2' : ''}`}
          >
            {item.label}
          </a>
        )
      ))}
      <Link to="/admin/login" onClick={onLinkClick}>
        <Button 
          variant="outline" 
          size={isMobile ? "default" : "sm"} 
          className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${isMobile ? 'w-full' : ''}`}
        >
          Admin Login
        </Button>
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Supplier Directory
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <NavigationLinks />
          )}

          {/* Mobile Burger Menu */}
          {isMobile && (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <div className="flex items-center justify-between">
                    <DrawerTitle>Navigation</DrawerTitle>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <X className="h-5 w-5" />
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <div className="px-4 pb-8">
                  <NavigationLinks 
                    isMobile={true} 
                    onLinkClick={() => setIsDrawerOpen(false)} 
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    </nav>
  );
};
