import React from 'react';
import { Truck, Clock, Globe, Shield } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light mb-12">Shipping Policy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Truck className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Free Worldwide Shipping</h3>
                <p className="text-gray-600">All orders over $5,000 qualify for complimentary shipping worldwide. Orders below this threshold incur a flat rate of $50 for international shipping.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Processing Time</h3>
                <p className="text-gray-600">Ready-to-ship items are processed within 1-2 business days. Custom pieces require 4-6 weeks for creation and quality assurance.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Globe className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">International Delivery</h3>
                <p className="text-gray-600">We ship to over 100 countries. Delivery times vary by location:
                  <br />- North America: 2-4 business days
                  <br />- Europe: 3-5 business days
                  <br />- Asia Pacific: 4-6 business days
                  <br />- Rest of World: 5-7 business days</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Insurance & Tracking</h3>
                <p className="text-gray-600">All shipments are fully insured and require signature upon delivery. Real-time tracking information is provided via email once your order ships.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-light mb-6">Shipping FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">How do I track my order?</h3>
                <p className="text-gray-600">Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Do you ship to P.O. boxes?</h3>
                <p className="text-gray-600">Due to security reasons and signature requirements, we cannot ship to P.O. boxes. Please provide a physical address for delivery.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">What if I'm not home for delivery?</h3>
                <p className="text-gray-600">The courier will attempt delivery three times. After the third attempt, the package will be held at the nearest depot for collection.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Are there any import duties?</h3>
                <p className="text-gray-600">Import duties and taxes are not included in the purchase price and are the responsibility of the customer. These charges vary by country.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}