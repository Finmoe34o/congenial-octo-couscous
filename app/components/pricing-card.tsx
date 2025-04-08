'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
  priceDetail?: string;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText,
  buttonVariant = 'default',
  disabled = false,
  onClick,
  priceDetail
}: PricingCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!disabled) {
      // Default behavior if no onClick provided
      router.push('/auth/login');
    }
  };

  return (
    <Card className={`w-full max-w-sm mx-auto ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-3 flex justify-center items-baseline">
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          {priceDetail && <span className="ml-1 text-sm text-muted-foreground">{priceDetail}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check 
                className={`h-5 w-5 mr-2 flex-shrink-0 ${feature.included ? 'text-primary' : 'text-muted-foreground opacity-50'}`} 
              />
              <span className={feature.included ? '' : 'text-muted-foreground line-through opacity-70'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleClick}
          variant={buttonVariant}
          className="w-full" 
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}