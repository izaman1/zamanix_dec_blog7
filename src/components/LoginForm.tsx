import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface LoginFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ onClose, onSuccess }: LoginFormProps) {
  const { login, signup } = useUser();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassphrasePopup, setShowPassphrasePopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    passphrase: ''
  });
  const [generatedPassphrase, setGeneratedPassphrase] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [tempLoginData, setTempLoginData] = useState<{email: string, password: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignup) {
        if (!formData.name || !formData.email || !formData.password || !formData.phone) {
          setError('All fields are required');
          setLoading(false);
          return;
        }

        const success = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });

        if (success) {
          setSuccess('Account created successfully! Please save your passphrase:');
          setGeneratedPassphrase(formData.passphrase);
          setTimeout(() => {
            onSuccess();
          }, 5000);
        } else {
          setError('Failed to create account');
        }
      } else {
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          setLoading(false);
          return;
        }

        if (formData.email === 'admin@zamanix.com') {
          const success = await login(formData.email, formData.password);
          if (success) {
            setSuccess('Login successful!');
            setTimeout(() => {
              onSuccess();
            }, 1500);
          } else {
            setError('Invalid credentials');
          }
        } else {
          // Store login data and show passphrase popup
          setTempLoginData({
            email: formData.email,
            password: formData.password
          });
          setShowPassphrasePopup(true);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePassphraseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempLoginData) return;

    setLoading(true);
    setError('');

    try {
      const success = await login(tempLoginData.email, tempLoginData.password, formData.passphrase);
      if (success) {
        setSuccess('Login successful!');
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError('Invalid passphrase');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  if (showPassphrasePopup) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-md rounded-lg shadow-xl mx-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">Enter Passphrase</h2>
              <button 
                onClick={() => {
                  setShowPassphrasePopup(false);
                  setTempLoginData(null);
                  setFormData(prev => ({ ...prev, passphrase: '' }));
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePassphraseSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded text-sm">
                  {success}
                </div>
              )}

              <div>
                <label htmlFor="passphrase" className="block text-sm font-medium text-gray-700">
                  Enter your 24-word passphrase
                </label>
                <input
                  type="text"
                  id="passphrase"
                  name="passphrase"
                  value={formData.passphrase}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-black/90 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Verifying...' : 'Verify Passphrase'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">{isSignup ? 'Create Account' : 'Login'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded text-sm">
                {success}
                {generatedPassphrase && (
                  <div className="mt-2 p-3 bg-gray-100 rounded text-gray-800 break-all">
                    {generatedPassphrase}
                  </div>
                )}
              </div>
            )}

            {isSignup && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-black/90 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Please wait...' : (isSignup ? 'CREATE ACCOUNT' : 'LOGIN')}
            </button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                  setSuccess('');
                  setGeneratedPassphrase('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    passphrase: ''
                  });
                }}
                className="text-gray-600 hover:text-black"
              >
                {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}