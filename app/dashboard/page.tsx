'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuggestionHistory } from '../components/suggestion-history';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Settings, User } from 'lucide-react';

// Type for pricing suggestion
type PricingSuggestion = {
  id: number;
  userId: number;
  skillType: string;
  experienceLevel: string;
  projectScope: string;
  location?: string;
  targetMarket?: string;
  minPrice: string;
  recommendedPrice: string;
  premiumPrice: string;
  createdAt: string;
};

// Type for user data
type UserData = {
  id: number;
  username: string;
  email: string;
  subscriptionTier: string;
  suggestionsRemaining: number;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pricingHistory, setPricingHistory] = useState<PricingSuggestion[]>([]);
  const [error, setError] = useState('');

  // Check if user is authenticated and fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        
        if (!authToken) {
          router.push('/auth');
          return;
        }
        
        // Fetch user data
        const userResponse = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (!userResponse.ok) {
          // Redirect to login if not authenticated
          localStorage.removeItem('authToken');
          router.push('/auth');
          return;
        }
        
        const userData = await userResponse.json();
        setUser(userData);
        
        // Only fetch pricing history for all tiers
        const historyResponse = await fetch('/api/pricing-suggestions', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setPricingHistory(historyData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load dashboard data. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      await fetch('/api/logout', { 
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      localStorage.removeItem('authToken');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Render content if user is authenticated
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold gradient-text">PricingGuru</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/pricing-suggestion" className="nav-link">Calculator</Link>
              <Link href="/pricing" className="nav-link">Pricing</Link>
            </nav>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
          </div>
          
          {/* Dashboard Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{user?.username}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Member since</span>
                      <span>{user?.createdAt ? formatDate(user.createdAt) : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Subscription</span>
                      <span className="capitalize">{user?.subscriptionTier || 'Free'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Subscription Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Plan</CardTitle>
                  <CardDescription>
                    {user?.subscriptionTier === 'basic' && 'Basic (Free)'}
                    {user?.subscriptionTier === 'pro' && 'Pro ($7.99/month)'}
                    {user?.subscriptionTier === 'business' && 'Business ($19.99/month)'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user?.subscriptionTier === 'basic' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Basic rate calculation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Location-based adjustment</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                          <span>
                            <strong>{user?.suggestionsRemaining}</strong> of 5 suggestions remaining
                          </span>
                        </div>
                      </>
                    )}
                    
                    {user?.subscriptionTier === 'pro' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Advanced rate calculation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Historical pricing data</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                          <span>
                            <strong>{user?.suggestionsRemaining}</strong> of 50 suggestions remaining
                          </span>
                        </div>
                      </>
                    )}
                    
                    {user?.subscriptionTier === 'business' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Advanced rate calculation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Historical pricing data</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Market trend analysis</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span>Premium support</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          <span><strong>Unlimited</strong> suggestions</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                {user?.subscriptionTier !== 'business' && (
                  <CardFooter>
                    <Link href="/pricing" className="w-full">
                      <Button className="w-full">Upgrade Plan</Button>
                    </Link>
                  </CardFooter>
                )}
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Get Started Card (if no suggestions yet) */}
              {pricingHistory.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Get Started with Pricing Suggestions</CardTitle>
                    <CardDescription>
                      Use our pricing calculator to get personalized rate recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4">
                        <Settings className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No pricing suggestions yet</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Create your first pricing suggestion to get personalized recommendations for your freelance rates.
                      </p>
                      <Link href="/pricing-suggestion">
                        <Button>
                          Create Pricing Suggestion
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing History</CardTitle>
                    <CardDescription>
                      Your previous pricing suggestions and recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SuggestionHistory suggestions={pricingHistory} />
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-between">
                    <span className="text-sm text-gray-500">
                      {pricingHistory.length} suggestion{pricingHistory.length !== 1 ? 's' : ''} in total
                    </span>
                    <Link href="/pricing-suggestion">
                      <Button>
                        Create New Suggestion
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}