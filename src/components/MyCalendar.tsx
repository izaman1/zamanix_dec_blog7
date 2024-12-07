import React from 'react';
import { useUser } from '../context/UserContext';
import { Calendar, Edit2, Trash2 } from 'lucide-react';

interface Event {
  id: string;
  date: string;
  occasion: string;
  name?: string;
  notes?: string;
  recurrence: 'once' | 'weekly' | 'monthly';
}

const formatDate = (dateStr: string, recurrence: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  
  const baseDate = date.toLocaleDateString('en-US', options);
  
  if (recurrence === 'once') {
    return baseDate;
  }
  
  return `${baseDate} (Repeats ${recurrence})`;
};

export default function MyCalendar() {
  const { user } = useUser();

  if (!user?.events?.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light">My Calendar</h2>
          <Calendar className="h-6 w-6 text-gray-600" />
        </div>
        <p className="text-gray-600 text-center">No events scheduled</p>
      </div>
    );
  }

  const handleEdit = (eventId: string) => {
    // Implement edit functionality
    console.log('Edit event:', eventId);
  };

  const handleDelete = (eventId: string) => {
    // Implement delete functionality
    console.log('Delete event:', eventId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light">My Calendar</h2>
        <Calendar className="h-6 w-6 text-gray-600" />
      </div>
      
      <div className="space-y-4">
        {user.events.map((event: Event) => (
          <div key={event.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{event.occasion}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {formatDate(event.date, event.recurrence)}
                </p>
                {event.name && (
                  <p className="text-gray-600 text-sm mt-1">For: {event.name}</p>
                )}
                {event.notes && (
                  <p className="text-gray-600 text-sm mt-2">{event.notes}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}