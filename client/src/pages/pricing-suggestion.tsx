import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

// Schema for suggestion form
const pricingSuggestionSchema = z.object({
  skillType: z.string({
    required_error: "Please select a skill type",
  }),
  experienceLevel: z.string({
    required_error: "Please select your experience level",
  }),
  projectScope: z.string({
    required_error: "Please select the project scope",
  }),
  location: z.string().optional(),
  targetMarket: z.string().optional(),
});

// Define skill types, experience levels, and project scopes
const skillTypes = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "ui-design", label: "UI/UX Design" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "content-writing", label: "Content Writing" },
  { value: "video-editing", label: "Video Editing" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "seo", label: "SEO" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "project-management", label: "Project Management" },
  { value: "virtual-assistant", label: "Virtual Assistant" },
  { value: "accounting", label: "Accounting" },
  { value: "legal", label: "Legal Services" },
  { value: "translation", label: "Translation" },
  { value: "voice-over", label: "Voice Over" },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (< 1 year)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "expert", label: "Expert (3-7 years)" },
  { value: "master", label: "Master (7+ years)" },
];

const projectScopes = [
  { value: "small", label: "Small (1-2 weeks)" },
  { value: "medium", label: "Medium (2-4 weeks)" },
  { value: "large", label: "Large (1-3 months)" },
  { value: "enterprise", label: "Enterprise (3+ months)" },
];

export default function PricingSuggestion() {
  const { user } = useAuth();
  const [showResults, setShowResults] = useState(false);
  const [currentSuggestionId, setCurrentSuggestionId] = useState<number | null>(null);
  
  // Form setup
  const form = useForm<z.infer<typeof pricingSuggestionSchema>>({
    resolver: zodResolver(pricingSuggestionSchema),
    defaultValues: {
      skillType: "",
      experienceLevel: "",
      projectScope: "",
      location: "",
      targetMarket: "",
    },
  });

  // Generate price suggestion mutation
  const suggestionMutation = useMutation({
    mutationFn: async (data: z.infer<typeof pricingSuggestionSchema>) => {
      const res = await apiRequest("POST", "/api/pricing-suggestion", data);
      return await res.json();
    },
    onSuccess: (data) => {
      setCurrentSuggestionId(data.id);
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ["/api/pricing-suggestions"] });
    },
  });

  // Get all previous suggestions for the user
  const { data: previousSuggestions, isLoading: loadingPrevious } = useQuery({
    queryKey: ["/api/pricing-suggestions"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/pricing-suggestions");
      return await res.json();
    },
  });

  // Get the current suggestion either from the mutation result or from the previous suggestions
  const currentSuggestion = currentSuggestionId
    ? previousSuggestions?.find((s: any) => s.id === currentSuggestionId) || suggestionMutation.data
    : suggestionMutation.data;

  // Form submission handler
  function onSubmit(data: z.infer<typeof pricingSuggestionSchema>) {
    suggestionMutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pricing Suggestion</h1>
          
          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Button>
            </Link>
            
            <div>
              <Badge variant="outline" className="mr-2">
                {user?.subscriptionTier === "business" 
                  ? "Business Plan" 
                  : user?.subscriptionTier === "pro" 
                    ? "Pro Plan" 
                    : "Basic Plan"}
              </Badge>
              
              {user?.subscriptionTier !== "business" && (
                <Badge variant="secondary">
                  {user?.suggestionsRemaining} suggestions remaining
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left side: Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Optimal Rate</CardTitle>
                <CardDescription>
                  Fill in the details below to get a pricing suggestion for your freelance work.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="skillType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your skill type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {skillTypes.map((skill) => (
                                <SelectItem key={skill.value} value={skill.value}>
                                  {skill.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The primary service you offer to clients
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Years of experience in this field
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectScope"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Scope</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the project scope" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectScopes.map((scope) => (
                                <SelectItem key={scope.value} value={scope.value}>
                                  {scope.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Typical size of your projects
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., United States, India, Remote" {...field} />
                          </FormControl>
                          <FormDescription>
                            Where you are based (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="targetMarket"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Market</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Startups, Enterprise, E-commerce" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your primary client industry (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={suggestionMutation.isPending}
                    >
                      {suggestionMutation.isPending ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </span>
                      ) : "Generate Pricing Suggestion"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side: Results or History */}
          <div className="md:col-span-3">
            <Tabs defaultValue={showResults ? "results" : "history"}>
              <TabsList className="mb-4">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="results">
                {!showResults ? (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                      <p className="text-gray-500 mb-2">No pricing suggestion yet</p>
                      <p className="text-sm text-gray-400">Fill out the form to generate your pricing suggestion</p>
                    </CardContent>
                  </Card>
                ) : suggestionMutation.isPending ? (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px]">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <p className="text-gray-500">Generating your pricing suggestion...</p>
                    </CardContent>
                  </Card>
                ) : currentSuggestion ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Pricing Recommendation</span>
                        <Badge className="ml-2">{
                          skillTypes.find(s => s.value === currentSuggestion.skillType)?.label
                        }</Badge>
                      </CardTitle>
                      <CardDescription>
                        Based on your {
                          experienceLevels.find(e => e.value === currentSuggestion.experienceLevel)?.label
                        } experience and {
                          projectScopes.find(p => p.value === currentSuggestion.projectScope)?.label
                        } projects
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500 mb-1">Minimum</p>
                          <p className="text-2xl font-bold">{currentSuggestion.minPrice}</p>
                          <p className="text-xs text-gray-400">Competitive Entry</p>
                        </div>
                        
                        <div className="bg-primary-50 border border-primary p-4 rounded-lg text-center">
                          <p className="text-sm text-primary-700 mb-1">Recommended</p>
                          <p className="text-3xl font-bold text-primary">{currentSuggestion.recommendedPrice}</p>
                          <p className="text-xs text-primary-600">Market Rate</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500 mb-1">Premium</p>
                          <p className="text-2xl font-bold">{currentSuggestion.premiumPrice}</p>
                          <p className="text-xs text-gray-400">High Value</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Experience Level</p>
                            <p className="font-medium">{
                              experienceLevels.find(e => e.value === currentSuggestion.experienceLevel)?.label
                            }</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Project Scope</p>
                            <p className="font-medium">{
                              projectScopes.find(p => p.value === currentSuggestion.projectScope)?.label
                            }</p>
                          </div>
                          {currentSuggestion.location && (
                            <div>
                              <p className="text-gray-500">Location</p>
                              <p className="font-medium">{currentSuggestion.location}</p>
                            </div>
                          )}
                          {currentSuggestion.targetMarket && (
                            <div>
                              <p className="text-gray-500">Target Market</p>
                              <p className="font-medium">{currentSuggestion.targetMarket}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-6">
                      <Button variant="outline" onClick={() => setShowResults(false)}>
                        New Suggestion
                      </Button>
                      
                      <p className="text-xs text-gray-500">
                        Generated on {new Date(currentSuggestion.createdAt).toLocaleDateString()}
                      </p>
                    </CardFooter>
                  </Card>
                ) : null}
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Previous Suggestions</CardTitle>
                    <CardDescription>
                      View and compare your past pricing suggestions
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {loadingPrevious ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : !previousSuggestions || previousSuggestions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>You haven't generated any pricing suggestions yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {previousSuggestions.map((suggestion: any) => (
                          <div 
                            key={suggestion.id}
                            className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                            onClick={() => {
                              setCurrentSuggestionId(suggestion.id);
                              setShowResults(true);
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2">
                                  {skillTypes.find(s => s.value === suggestion.skillType)?.label}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {new Date(suggestion.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="font-bold">{suggestion.recommendedPrice}</span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Experience: </span>
                                <span>{experienceLevels.find(e => e.value === suggestion.experienceLevel)?.label.split(' ')[0]}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Scope: </span>
                                <span>{projectScopes.find(p => p.value === suggestion.projectScope)?.label.split(' ')[0]}</span>
                              </div>
                              {suggestion.location && (
                                <div>
                                  <span className="text-gray-500">Location: </span>
                                  <span>{suggestion.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
