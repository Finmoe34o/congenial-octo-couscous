'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

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

interface SuggestionHistoryProps {
  suggestions: PricingSuggestion[];
}

export function SuggestionHistory({ suggestions }: SuggestionHistoryProps) {
  // Sort suggestions by date (newest first)
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Format date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Format skill type for better display
  const formatSkillType = (skillType: string) => {
    return skillType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format experience level for better display
  const formatExperienceLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <div className="space-y-6">
      {sortedSuggestions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No pricing suggestions found. Create one to get started!
        </div>
      ) : (
        sortedSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-wrap justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {formatSkillType(suggestion.skillType)}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{formatExperienceLevel(suggestion.experienceLevel)} • {formatExperienceLevel(suggestion.projectScope)}</span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDate(suggestion.createdAt)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Minimum</div>
                <div className="font-semibold">{suggestion.minPrice}</div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded p-2 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Recommended</div>
                <div className="font-semibold text-indigo-600 dark:text-indigo-400">{suggestion.recommendedPrice}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Premium</div>
                <div className="font-semibold">{suggestion.premiumPrice}</div>
              </div>
            </div>
            
            {(suggestion.location || suggestion.targetMarket) && (
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap">
                {suggestion.location && (
                  <span className="mr-3">
                    Location: {suggestion.location}
                  </span>
                )}
                {suggestion.targetMarket && (
                  <span>
                    Target Market: {suggestion.targetMarket}
                  </span>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}