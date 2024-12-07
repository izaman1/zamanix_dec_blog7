import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1612404730960-5c71577fca11?q=80&w=2070" 
              alt="Empty Cart" 
              className="w-64 h-64 object-cover mx-auto rounded-lg opacity-50"
            />
          </div>
          <h1 className="text-3xl font-light mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Browse our collections to add beautiful pieces to your cart</p>
          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-6 pb-8 border-b">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-lg font-light">{item.name}</h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{item.material}</p>
                    <p className="text-lg mt-2">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 border border-gray-200 hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border border-gray-200 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-24">
              <h2 className="text-xl font-light mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>
              
              <button className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-black/90 transition-colors">
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-6">
                <Link 
                  to="/collections/all"
                  className="text-sm text-gray-600 hover:text-black flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add padding at the bottom for mobile navigation */}
      <div className="h-20 md:hidden" />
    </div>
  );
}