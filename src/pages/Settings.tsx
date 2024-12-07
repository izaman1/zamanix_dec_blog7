import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Settings() {
  const { user, updateUserDetails } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDetails(formData);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light mb-12">Settings</h1>
        
        {user.signupMethod === 'manual' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-black/90 transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-600">
            <p>Your account was created using {user.signupMethod}.</p>
            <p>Profile details cannot be modified.</p>
          </div>
        )}
      </div>
    </div>
  );
}