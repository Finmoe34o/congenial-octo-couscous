'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Form validation schema
const pricingSuggestionSchema = z.object({
  skillType: z.string().min(1, { message: "Skill type is required" }),
  experienceLevel: z.string().min(1, { message: "Experience level is required" }),
  projectScope: z.string().min(1, { message: "Project scope is required" }),
  location: z.string().optional(),
  targetMarket: z.string().optional(),
});

type FormValues = z.infer<typeof pricingSuggestionSchema>;

// Type for pricing suggestion result
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

export default function PricingSuggestionPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ 
    username: string;
    subscriptionTier: string;
    suggestionsRemaining: number; 
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<FormValues>({
    skillType: '',
    experienceLevel: '',
    projectScope: '',
    location: '',
    targetMarket: '',
  });
  
  const [result, setResult] = useState<PricingSuggestion | null>(null);
  const [error, setError] = useState('');
  const [pricingHistory, setPricingHistory] = useState<PricingSuggestion[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        
        if (!authToken) {
          router.push('/auth');
          return;
        }
        
        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (!response.ok) {
          // Redirect to login if not authenticated
          localStorage.removeItem('authToken');
          router.push('/auth');
          return;
        }
        
        const userData = await response.json();
        setUser(userData);
        
        // Only fetch pricing history for Pro or Business tier
        if (userData.subscriptionTier === 'pro' || userData.subscriptionTier === 'business') {
          fetchPricingHistory();
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/auth');
      }
    };
    
    checkAuth();
  }, [router]);

  // Fetch pricing history
  const fetchPricingHistory = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/pricing-suggestions', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPricingHistory(data);
      }
    } catch (error) {
      console.error('Error fetching pricing history:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    try {
      // Validate form data
      pricingSuggestionSchema.parse(formValues);
      
      setIsLoading(true);
      
      // Submit pricing suggestion request
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/pricing-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formValues),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to generate price suggestion.');
        setIsLoading(false);
        
        // If the error is that the user has no suggestions remaining, update the user object
        if (data.suggestionsRemaining !== undefined) {
          setUser((prev) => 
            prev ? { ...prev, suggestionsRemaining: data.suggestionsRemaining } : null
          );
        }
        
        return;
      }
      
      // Set result
      setResult(data);
      
      // Update user's suggestions remaining count
      if (user && user.subscriptionTier !== 'business') {
        setUser((prev) => 
          prev ? { ...prev, suggestionsRemaining: prev.suggestionsRemaining - 1 } : null
        );
      }
      
      // Refresh pricing history for paid tiers
      if (user && (user.subscriptionTier === 'pro' || user.subscriptionTier === 'business')) {
        fetchPricingHistory();
      }
      
      setIsLoading(false);
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
        setError('An unexpected error occurred. Please try again.');
        console.error('Pricing suggestion error:', error);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('authToken');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Format skill type for display
  const formatSkillType = (skillType: string) => {
    return skillType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format experience level for display
  const formatExperienceLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Render loading state or auth redirect if not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{user.username}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{user.subscriptionTier} Plan</span>
                {user.subscriptionTier !== 'business' && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{user.suggestionsRemaining} suggestions remaining</span>
                  </>
                )}
              </div>
              
              {(user.subscriptionTier === 'pro' || user.subscriptionTier === 'business') && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                >
                  {showHistory ? 'Hide History' : 'View History'}
                </button>
              )}
            </div>
            
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
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Freelance Rate Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get personalized pricing recommendations based on your skills, experience, and project details.
            </p>
          </div>
          
          {/* Main Content */}
          <div className={`grid ${showHistory ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
            {/* Calculator Column */}
            <div className={showHistory ? '' : 'lg:max-w-2xl lg:mx-auto w-full'}>
              {/* Subscription Warning */}
              {user.subscriptionTier === 'basic' && user.suggestionsRemaining === 0 && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">You've used all your free suggestions</h3>
                      <div className="mt-2 text-sm">
                        <p>Upgrade to Pro or Business plan to get more pricing suggestions and unlock pricing history.</p>
                      </div>
                      <div className="mt-4">
                        <div className="flex space-x-3">
                          <Link href="/pricing" className="inline-flex items-center px-3 py-1.5 border border-amber-700 text-xs font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50">
                            View Upgrade Options
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Calculator Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
                
                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Skill Type */}
                  <div>
                    <label htmlFor="skillType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Skill Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="skillType"
                      name="skillType"
                      value={formValues.skillType}
                      onChange={handleChange}
                      className={`input-field w-full ${errors.skillType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select skill type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">Mobile Development</option>
                      <option value="ui-design">UI Design</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="content-writing">Content Writing</option>
                      <option value="video-editing">Video Editing</option>
                      <option value="marketing">Marketing</option>
                      <option value="seo">SEO</option>
                      <option value="data-analysis">Data Analysis</option>
                      <option value="project-management">Project Management</option>
                      <option value="virtual-assistant">Virtual Assistant</option>
                      <option value="accounting">Accounting</option>
                      <option value="legal">Legal</option>
                      <option value="translation">Translation</option>
                      <option value="voice-over">Voice Over</option>
                    </select>
                    {errors.skillType && <p className="mt-1 text-sm text-red-600">{errors.skillType}</p>}
                  </div>
                  
                  {/* Experience Level */}
                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formValues.experienceLevel}
                      onChange={handleChange}
                      className={`input-field w-full ${errors.experienceLevel ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (3-5 years)</option>
                      <option value="expert">Expert (6-9 years)</option>
                      <option value="master">Master (10+ years)</option>
                    </select>
                    {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
                  </div>
                  
                  {/* Project Scope */}
                  <div>
                    <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Scope <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectScope"
                      name="projectScope"
                      value={formValues.projectScope}
                      onChange={handleChange}
                      className={`input-field w-full ${errors.projectScope ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select project scope</option>
                      <option value="small">Small (1-2 weeks)</option>
                      <option value="medium">Medium (1-2 months)</option>
                      <option value="large">Large (3-6 months)</option>
                      <option value="enterprise">Enterprise (6+ months)</option>
                    </select>
                    {errors.projectScope && <p className="mt-1 text-sm text-red-600">{errors.projectScope}</p>}
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Location <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formValues.location}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="e.g. United States, Canada, etc."
                    />
                  </div>
                  
                  {/* Target Market */}
                  <div>
                    <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Target Market <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="targetMarket"
                      name="targetMarket"
                      type="text"
                      value={formValues.targetMarket}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="e.g. Small Business, Enterprise, etc."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading || (user.subscriptionTier === 'basic' && user.suggestionsRemaining === 0)}
                      className="w-full button-primary flex items-center justify-center py-2 px-4"
                    >
                      {isLoading ? (
                        <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                      ) : null}
                      Calculate Pricing
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Results */}
              {result && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Pricing Suggestion</h2>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Skill Type</span>
                        <p className="font-medium">{formatSkillType(result.skillType)}</p>
                      </div>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Experience Level</span>
                        <p className="font-medium">{formatExperienceLevel(result.experienceLevel)}</p>
                      </div>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Project Scope</span>
                        <p className="font-medium">{formatExperienceLevel(result.projectScope)}</p>
                      </div>
                      {result.location && (
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                          <p className="font-medium">{result.location}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">Recommended Pricing Tiers</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Minimum</p>
                          <p className="text-xl font-bold">{result.minPrice}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Budget Option</p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-md p-4 text-center relative">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                            Recommended
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Standard</p>
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{result.recommendedPrice}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Competitive Rate</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Premium</p>
                          <p className="text-xl font-bold">{result.premiumPrice}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Expert Rate</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>These rates are based on market averages and the information you provided.</p>
                        <p className="mt-1">Consider your unique value proposition, client budget, and project complexity when finalizing your rates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pricing History Column */}
            {showHistory && (
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Pricing History</h2>
                  
                  {pricingHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No pricing history yet. Generate your first pricing suggestion!</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {pricingHistory.map((item) => (
                        <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{formatSkillType(item.skillType)}</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(item.createdAt)}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mb-2 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Experience:</span>{' '}
                              <span>{formatExperienceLevel(item.experienceLevel)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Scope:</span>{' '}
                              <span>{formatExperienceLevel(item.projectScope)}</span>
                            </div>
                            {item.location && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Location:</span>{' '}
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3 grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Minimum</p>
                              <p className="font-medium">{item.minPrice}</p>
                            </div>
                            <div className="text-indigo-600 dark:text-indigo-400">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Recommended</p>
                              <p className="font-bold">{item.recommendedPrice}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Premium</p>
                              <p className="font-medium">{item.premiumPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Upgrade CTA for Basic Users */}
          {user.subscriptionTier === 'basic' && (
            <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Upgrade for More Features</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
                Get more pricing suggestions, access to your pricing history, and advanced analytics with our Pro and Business plans.
              </p>
              <Link href="/pricing" className="button-primary inline-flex py-2 px-6">
                View Pricing Plans
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}