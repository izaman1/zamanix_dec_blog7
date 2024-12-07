import React from 'react';
import { Package } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { user } = useUser();

  if (!user || user.orders.length === 0) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-light mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't placed any orders yet.</p>
          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light mb-12">My Orders</h1>
        <div className="space-y-8">
          {user.orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100">{order.status}</span>
              </div>
              {/* Order items would go here */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-medium">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add padding at the bottom for mobile navigation */}
      <div className="h-20 md:hidden" />
    </div>
  );
}