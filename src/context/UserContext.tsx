import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  coins: number;
  loginStreak: number;
  token: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: { name: string; email: string; password: string; phone: string }) => Promise<boolean>;
  updateUserDetails: (details: Partial<User>) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Special case for admin
      if (email === 'admin@zamanix.com' && password === 'zamanix_admin') {
        const adminUser = {
          _id: 'admin',
          name: 'Admin',
          email: 'admin@zamanix.com',
          phone: '',
          coins: 0,
          loginStreak: 0,
          token: 'admin_token'
        };
        setUser(adminUser);
        return true;
      }

      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setUser(data.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (data: { name: string; email: string; password: string; phone: string }): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setUser(result.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateUserDetails = async (details: Partial<User>): Promise<boolean> => {
    if (!user?.token) return false;

    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(details)
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setUser(prev => prev ? { ...prev, ...data.data } : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      signup,
      updateUserDetails
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}