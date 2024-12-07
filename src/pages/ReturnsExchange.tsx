import React from 'react';
import { RefreshCw, Package, Clock, CheckCircle } from 'lucide-react';

export default function ReturnsExchange() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light mb-12">Returns & Exchanges</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <RefreshCw className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">30-Day Return Policy</h3>
                <p className="text-gray-600">We offer a 30-day return period for all standard collection pieces in their original, unworn condition with all original documentation and packaging.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Package className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Return Process</h3>
                <p className="text-gray-600">1. Contact our customer service team
                  <br />2. Receive a return authorization
                  <br />3. Package item securely with all documentation
                  <br />4. Ship using our prepaid return label
                  <br />5. Refund processed within 5-7 business days after receipt</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Exchange Timeline</h3>
                <p className="text-gray-600">Exchanges are processed within 2-3 business days of receiving your return. New items are shipped via express delivery at no additional cost.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">If you receive a piece with any quality issues, we'll provide a full refund or replacement at our expense. Our lifetime warranty covers manufacturing defects.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-light mb-6">Important Notes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Custom & Personalized Items</h3>
                <p className="text-gray-600">Custom-made and personalized pieces are final sale unless they arrive with manufacturing defects.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">International Returns</h3>
                <p className="text-gray-600">International returns are accepted. Please note that shipping costs and import duties for returns are the responsibility of the customer.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Condition Requirements</h3>
                <p className="text-gray-600">Items must be unworn, unaltered, and in their original condition with all tags and protective materials intact.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Gift Returns</h3>
                <p className="text-gray-600">Gift recipients may exchange items or receive store credit. The original purchaser's information is required for refunds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}