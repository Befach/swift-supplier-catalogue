
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: 'https://befach.com/pages/about-us', label: 'About', external: true },
    { href: 'https://befach.com/policies/contact-information', label: 'Contact', external: true }
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <img 
              src="/lovable-uploads/195e0529-837e-47f4-9881-981f6d53e663.png" 
              alt="BEFACH INTERNATIONAL" 
              className="h-8 sm:h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.external ? (
                <a 
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    location.pathname === item.href 
                      ? 'text-orange-500' 
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link 
              to="/admin/login" 
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    item.external ? (
                      <a 
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="font-medium text-gray-700 hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link 
                        key={item.href}
                        to={item.href}
                        onClick={closeMenu}
                        className={`font-medium transition-colors py-2 px-3 rounded-md hover:bg-gray-100 ${
                          location.pathname === item.href 
                            ? 'text-orange-500 bg-orange-50' 
                            : 'text-gray-700 hover:text-orange-500'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                  <Link 
                    to="/admin/login"
                    onClick={closeMenu}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-medium transition-colors text-center mt-4"
                  >
                    Admin Login
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
