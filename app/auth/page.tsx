'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showRegister = searchParams.get('register') === 'true';
  
  const [activeTab, setActiveTab] = useState(showRegister ? 'register' : 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [authError, setAuthError] = useState('');

  // Check if user is already logged in, redirect to home if they are
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          router.push('/pricing-suggestion'); // Redirect to pricing suggestion page
        }
      } catch (error) {
        // User is not logged in, stay on auth page
      }
    };
    
    checkAuth();
  }, [router]);

  // Handle login form submission
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setErrors({});
    
    try {
      // Validate form data
      loginSchema.parse(loginData);
      
      setIsLoading(true);
      
      // Submit login request
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.error || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }
      
      // Login successful, store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Redirect to the pricing suggestion page
      router.push('/pricing-suggestion');
    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        // Handle other errors
        setAuthError('An unexpected error occurred. Please try again.');
        console.error('Login error:', error);
      }
    }
  }

  // Handle registration form submission
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setErrors({});
    
    try {
      // Validate form data
      registerSchema.parse(registerData);
      
      setIsLoading(true);
      
      // Submit registration request
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setAuthError(data.error || 'Registration failed. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Registration successful, store token in localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Redirect to the pricing suggestion page
      router.push('/pricing-suggestion');
    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        // Handle other errors
        setAuthError('An unexpected error occurred. Please try again.');
        console.error('Registration error:', error);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Form Section */}
      <div className="md:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo and Navigation */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl font-bold gradient-text">PricingGuru</h1>
            </Link>
            
            {/* Tab Switching */}
            <div className="flex rounded-md bg-gray-100 p-1 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
          
          {/* General Error Message */}
          {authError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {authError}
            </div>
          )}
          
          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className={`input-field w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className={`input-field w-full ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full button-primary flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  ) : null}
                  Sign In
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
          
          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className={`input-field w-full ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="yourusername"
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>
              
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className={`input-field w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className={`input-field w-full ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className={`input-field w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full button-primary flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  ) : null}
                  Create Account
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="md:w-1/2 bg-indigo-600 p-8 flex items-center hero-gradient">
        <div className="max-w-lg mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Set The Right Price For Your Freelance Services
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Join thousands of freelancers who use PricingGuru to confidently set their rates and maximize earnings.
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Free Tier Available</p>
                <p className="text-sm opacity-70">Get 5 pricing suggestions with our basic free plan</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Affordable Premium Plans</p>
                <p className="text-sm opacity-70">Upgrade to Pro ($7.99/mo) or Business ($19.99/mo)</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Pricing History & Analytics</p>
                <p className="text-sm opacity-70">Track your pricing history and market trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}