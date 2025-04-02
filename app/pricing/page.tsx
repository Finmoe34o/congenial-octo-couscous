'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PricingCard } from '../components/pricing-card';
import { Button } from '../components/ui/button';
import { ArrowLeft, BarChart2, CheckCircle, Compass, Database, Infinity, Target, Zap } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  // Check login status on component mount
  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/user');
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  const handleProSubscribe = async () => {
    if (!isLoggedIn) {
      router.push('/auth?register=true');
      return;
    }
    
    try {
      const response = await fetch('/api/create-pro-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const handleBusinessSubscribe = async () => {
    if (!isLoggedIn) {
      router.push('/auth?register=true');
      return;
    }
    
    try {
      const response = await fetch('/api/create-business-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Link href="/" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Choose Your Plan</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
          Get access to professional pricing suggestions tailored for freelancers
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 lg:gap-12 mt-16">
        {/* Basic Plan */}
        <PricingCard
          title="Basic"
          price="Free"
          description="Perfect for new freelancers just starting out"
          features={[
            { text: "5 pricing suggestions per month", included: true },
            { text: "Basic rate calculation", included: true },
            { text: "Location-based adjustment", included: true },
            { text: "Email support", included: true },
            { text: "Historical pricing data", included: false },
            { text: "Unlimited pricing suggestions", included: false },
            { text: "Market trend analysis", included: false },
            { text: "Premium support", included: false },
          ]}
          buttonText={isLoggedIn === true ? "Current Plan" : "Get Started for Free"}
          buttonVariant="outline"
          disabled={isLoggedIn === true}
          onClick={isLoggedIn === true ? undefined : () => router.push('/auth?register=true')}
        />

        {/* Pro Plan */}
        <PricingCard
          title="Pro"
          price="$7.99"
          priceDetail="/month"
          description="For established freelancers looking to optimize pricing"
          popular={true}
          features={[
            { text: "50 pricing suggestions per month", included: true },
            { text: "Advanced rate calculation", included: true },
            { text: "Location-based adjustment", included: true },
            { text: "Priority email support", included: true },
            { text: "Historical pricing data", included: true },
            { text: "Unlimited pricing suggestions", included: false },
            { text: "Market trend analysis", included: false },
            { text: "Premium support", included: false },
          ]}
          buttonText="Subscribe to Pro"
          onClick={handleProSubscribe}
        />

        {/* Business Plan */}
        <PricingCard
          title="Business"
          price="$19.99"
          priceDetail="/month"
          description="For professional freelancers and agencies"
          features={[
            { text: "Unlimited pricing suggestions", included: true },
            { text: "Advanced rate calculation", included: true },
            { text: "Location-based adjustment", included: true },
            { text: "Priority email support", included: true },
            { text: "Historical pricing data", included: true },
            { text: "Market trend analysis", included: true },
            { text: "Competitor rate insights", included: true },
            { text: "Premium support", included: true },
          ]}
          buttonText="Subscribe to Business"
          onClick={handleBusinessSubscribe}
        />
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose PricingGuru?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center mb-5">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Precision Pricing</h3>
            <p className="text-gray-500">Get accurate price suggestions based on your specific skills, experience, and market demand.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center mb-5">
              <Compass className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Intelligence</h3>
            <p className="text-gray-500">Stay competitive with pricing adjusted to your local market conditions and industry standards.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center mb-5">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Historical Insights</h3>
            <p className="text-gray-500">Track your pricing history to identify patterns and optimize your rates over time.</p>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to optimize your freelance pricing?</h2>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => router.push('/pricing-suggestion')} variant="default" size="lg">
            Try Pricing Calculator
          </Button>
          <Button onClick={() => router.push('/')} variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}