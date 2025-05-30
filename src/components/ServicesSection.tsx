
import React from 'react';
import { Globe, Truck, CreditCard, ChartArea, FileText, ShieldCheck } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  iconColor: string;
}

const services: Service[] = [
  {
    id: 'sourcing',
    title: 'Sourcing',
    description: 'Our sourcing team links up with trusted global suppliers to score top-quality products at the best prices.',
    icon: Globe,
    bgColor: 'bg-orange-500',
    iconColor: 'text-white'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Our international logistics simplifies imports to India with seamless end-to-end logistics.',
    icon: Truck,
    bgColor: 'bg-amber-600',
    iconColor: 'text-white'
  },
  {
    id: 'letter-of-credit',
    title: 'Letter of Credit',
    description: 'We use encrypted, secure payment methods to keep your transactions safe.',
    icon: CreditCard,
    bgColor: 'bg-orange-500',
    iconColor: 'text-white'
  },
  {
    id: 'data-insights',
    title: 'Extended Data Insights',
    description: 'We provide data analytics that will help you understand market trends and manage imports better.',
    icon: ChartArea,
    bgColor: 'bg-yellow-500',
    iconColor: 'text-white'
  },
  {
    id: 'customs-clearances',
    title: 'Customs Clearances',
    description: 'Complete customs documentation and clearance services to ensure smooth import processes.',
    icon: FileText,
    bgColor: 'bg-amber-600',
    iconColor: 'text-white'
  },
  {
    id: 'quality-sgs',
    title: 'Ensure Quality SGS',
    description: 'Quality assurance through SGS certification to guarantee product standards and reliability.',
    icon: ShieldCheck,
    bgColor: 'bg-amber-700',
    iconColor: 'text-white'
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to streamline your import and sourcing operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 ${
                index === 2 ? 'border-2 border-orange-200 bg-orange-50' : 'bg-gray-50 border border-gray-100'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <service.icon className={`w-8 h-8 ${service.iconColor}`} />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
