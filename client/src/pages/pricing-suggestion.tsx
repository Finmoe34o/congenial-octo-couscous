import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, HomeIcon } from "lucide-react";

// Create form schema with Zod
const pricingFormSchema = z.object({
  skillType: z.string({
    required_error: "Please select a skill type",
  }),
  experienceLevel: z.string({
    required_error: "Please select your experience level",
  }),
  projectScope: z.string({
    required_error: "Please select a project scope",
  }),
  location: z.string().optional(),
  targetMarket: z.string().optional(),
});

// Define form types from schema
type PricingFormValues = z.infer<typeof pricingFormSchema>;

// Result type for the pricing suggestion
type PricingSuggestionResult = {
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

export default function PricingSuggestion() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [result, setResult] = useState<PricingSuggestionResult | null>(null);

  // Get user's suggestions count from a query
  const { data: userData } = useQuery({
    queryKey: ["/api/user"],
    enabled: !!user, // Only run if user is logged in
  });

  // Get previous suggestions
  const { data: previousSuggestions, isLoading: isLoadingSuggestions } = useQuery({
    queryKey: ["/api/pricing-suggestions"],
    enabled: !!user, // Only run if user is logged in
  });

  // Setup the form
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      skillType: "",
      experienceLevel: "",
      projectScope: "",
      location: "",
      targetMarket: "",
    },
  });

  // Create pricing suggestion mutation
  const createSuggestion = useMutation({
    mutationFn: async (data: PricingFormValues) => {
      const response = await apiRequest("POST", "/api/pricing-suggestion", data);
      return response.json();
    },
    onSuccess: (data: PricingSuggestionResult) => {
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing-suggestions"] });
      
      toast({
        title: "Pricing suggestion created!",
        description: "Your personalized pricing suggestion is ready.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error creating pricing suggestion",
        description: error.message,
      });
    },
  });

  // Form submission handler
  function onSubmit(data: PricingFormValues) {
    createSuggestion.mutate(data);
  }

  // Reset form and result
  function handleReset() {
    setResult(null);
    form.reset();
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pricing Suggestion Tool</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </div>

      {/* User subscription info */}
      {userData && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Subscription</CardTitle>
            <CardDescription>Current plan and pricing suggestions remaining</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium capitalize">
                  {userData.subscriptionTier === "business" 
                    ? "Business Plan" 
                    : userData.subscriptionTier === "pro" 
                    ? "Pro Plan" 
                    : "Basic Plan"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suggestions Remaining</p>
                <p className="font-medium">
                  {userData.subscriptionTier === "business" 
                    ? "Unlimited" 
                    : userData.suggestionsRemaining}
                </p>
              </div>
              <div>
                {userData.subscriptionTier !== "business" && userData.suggestionsRemaining < 3 && (
                  <Button variant="outline" asChild>
                    <Link href="/upgrade">
                      Upgrade Plan
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result display */}
      {result && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Pricing Suggestion</CardTitle>
            <CardDescription>
              Based on your {result.experienceLevel} experience in {result.skillType} for {result.projectScope} projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-muted-foreground mb-2">Minimum Rate</h3>
                <p className="text-2xl font-bold">{result.minPrice}</p>
                <p className="text-sm text-muted-foreground mt-1">Value Option</p>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg text-center border-2 border-primary">
                <h3 className="font-medium text-primary mb-2">Recommended Rate</h3>
                <p className="text-3xl font-bold text-primary">{result.recommendedPrice}</p>
                <p className="text-sm text-muted-foreground mt-1">Standard Market Rate</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-muted-foreground mb-2">Premium Rate</h3>
                <p className="text-2xl font-bold">{result.premiumPrice}</p>
                <p className="text-sm text-muted-foreground mt-1">Expert/Specialized</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Create Another Suggestion
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Pricing form */}
      {!result && (
        <Card>
          <CardHeader>
            <CardTitle>Generate a Pricing Suggestion</CardTitle>
            <CardDescription>
              Fill out this form to get a personalized pricing suggestion for your freelance services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              <SelectValue placeholder="Select your skill" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-development">Mobile Development</SelectItem>
                            <SelectItem value="ui-design">UI/UX Design</SelectItem>
                            <SelectItem value="graphic-design">Graphic Design</SelectItem>
                            <SelectItem value="content-writing">Content Writing</SelectItem>
                            <SelectItem value="video-editing">Video Editing</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="seo">SEO Services</SelectItem>
                            <SelectItem value="data-analysis">Data Analysis</SelectItem>
                            <SelectItem value="project-management">Project Management</SelectItem>
                            <SelectItem value="virtual-assistant">Virtual Assistant</SelectItem>
                            <SelectItem value="accounting">Accounting</SelectItem>
                            <SelectItem value="legal">Legal Services</SelectItem>
                            <SelectItem value="translation">Translation</SelectItem>
                            <SelectItem value="voice-over">Voice Over</SelectItem>
                          </SelectContent>
                        </Select>
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
                              <SelectValue placeholder="Select your experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                            <SelectItem value="expert">Expert (6-9 years)</SelectItem>
                            <SelectItem value="master">Master (10+ years)</SelectItem>
                          </SelectContent>
                        </Select>
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
                              <SelectValue placeholder="Select project size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small (1-2 weeks)</SelectItem>
                            <SelectItem value="medium">Medium (1-2 months)</SelectItem>
                            <SelectItem value="large">Large (3-6 months)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (6+ months)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetMarket"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Target Market (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Small Businesses, Startups, Enterprise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createSuggestion.isPending}
                >
                  {createSuggestion.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Pricing Suggestion"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Previous suggestions */}
      {previousSuggestions && previousSuggestions.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your Previous Suggestions</h2>
          
          {isLoadingSuggestions ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {previousSuggestions.map((suggestion: PricingSuggestionResult) => (
                <Card key={suggestion.id}>
                  <CardContent className="py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Service Type</p>
                        <p className="font-medium capitalize">
                          {suggestion.skillType.replace(/-/g, ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">Experience Level</p>
                        <p className="font-medium capitalize">
                          {suggestion.experienceLevel}
                        </p>
                      </div>
                      
                      <div className="col-span-3 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Minimum</p>
                          <p className="font-medium">{suggestion.minPrice}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Recommended</p>
                          <p className="font-medium">{suggestion.recommendedPrice}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Premium</p>
                          <p className="font-medium">{suggestion.premiumPrice}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}