import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Hero() {
  const { user, addEvent } = useUser();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    occasion: '',
    name: '',
    notes: '',
    email: '',
    recurrence: 'once',
    calendarSync: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to set calendar reminders');
      return;
    }

    addEvent({
      date: formData.date,
      occasion: formData.occasion,
      name: formData.name,
      notes: formData.notes,
      recurrence: formData.recurrence as 'once' | 'weekly' | 'monthly' | 'yearly',
      calendarSync: formData.calendarSync
    });

    setIsCalendarOpen(false);
    setFormData({
      date: '',
      occasion: '',
      name: '',
      notes: '',
      email: '',
      recurrence: 'once',
      calendarSync: false
    });
  };

  return (
    <div className="relative h-[90vh] bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070"
          alt="Luxury Diamond Ring"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-light mb-4 md:mb-6 tracking-wide text-white">
              Timeless Elegance
            </h1>
            <p className="text-base md:text-lg mb-8 font-light tracking-wide text-white/90">
              Discover our curated collection of exquisite diamond jewelry, where each piece tells a unique story of beauty and craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/collections/all"
                className="bg-white text-black px-8 py-4 text-sm tracking-wider hover:bg-white/90 transition-colors text-center"
              >
                EXPLORE COLLECTION
              </Link>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="border border-white text-white px-8 py-4 text-sm tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>BLOCK YOUR CALENDAR</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div 
            className="bg-white w-full max-w-md rounded-lg shadow-xl transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-black">Block Your Calendar</h2>
                <button 
                  onClick={() => setIsCalendarOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Special Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700">Repeat</label>
                  <select
                    id="recurrence"
                    name="recurrence"
                    value={formData.recurrence}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  >
                    <option value="once">Once</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">Occasion</label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    required
                  >
                    <option value="">Select an occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="engagement">Engagement</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (Optional)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Who is this reminder for?"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any specific preferences or ideas?"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="calendarSync"
                    name="calendarSync"
                    checked={formData.calendarSync}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="calendarSync" className="text-sm text-gray-700">
                    Sync with my calendar
                  </label>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-4">
                  <Mail className="h-5 w-5 mr-2" />
                  <p>You'll receive email reminders based on your selected frequency</p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Bell className="h-5 w-5 mr-2" />
                  <p>We'll suggest perfect gifts based on the occasion</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-md text-sm tracking-wider hover:bg-black/90 transition-colors mt-6"
                >
                  SET REMINDER
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}