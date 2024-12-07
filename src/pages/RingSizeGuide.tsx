import React from 'react';

export default function RingSizeGuide() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light mb-12">Ring Size Guide</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-light mb-6">How to Measure Your Ring Size</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Method 1: Using a Ring Sizer</h3>
                <p className="text-gray-600">Visit any Zamanix boutique for a professional fitting with our ring sizer tool. This is the most accurate method to determine your ring size.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Method 2: Using an Existing Ring</h3>
                <p className="text-gray-600">Measure the internal diameter of a ring that fits well:
                  <br />- Place the ring on a piece of paper
                  <br />- Draw circles inside and outside the ring
                  <br />- Measure the internal diameter in millimeters
                  <br />- Compare with our size chart below</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Method 3: String Method</h3>
                <p className="text-gray-600">1. Wrap a string around your finger
                  <br />2. Mark where the string overlaps
                  <br />3. Measure the length in millimeters
                  <br />4. Use our conversion chart to find your size</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-4">Tips for Accurate Measurement</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Measure at the end of the day when your fingers are at their largest</li>
                <li>Avoid measuring when your hands are cold</li>
                <li>Consider seasonal changes in finger size</li>
                <li>Account for wide bands needing a slightly larger size</li>
                <li>If between sizes, choose the larger size</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-6">International Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">US</th>
                    <th className="px-4 py-2 text-left">UK</th>
                    <th className="px-4 py-2 text-left">EU</th>
                    <th className="px-4 py-2 text-left">Diameter (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">4</td>
                    <td className="px-4 py-2">H</td>
                    <td className="px-4 py-2">47</td>
                    <td className="px-4 py-2">14.9</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">5</td>
                    <td className="px-4 py-2">J</td>
                    <td className="px-4 py-2">49</td>
                    <td className="px-4 py-2">15.7</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">6</td>
                    <td className="px-4 py-2">L</td>
                    <td className="px-4 py-2">51</td>
                    <td className="px-4 py-2">16.5</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">7</td>
                    <td className="px-4 py-2">N</td>
                    <td className="px-4 py-2">54</td>
                    <td className="px-4 py-2">17.3</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">8</td>
                    <td className="px-4 py-2">P</td>
                    <td className="px-4 py-2">57</td>
                    <td className="px-4 py-2">18.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6">
              <h3 className="font-medium mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">Our jewelry consultants are available to assist you with sizing questions and can provide personalized recommendations.</p>
              <button className="bg-black text-white px-6 py-3 text-sm tracking-wider hover:bg-black/90 transition-colors">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}