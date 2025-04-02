import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardContent className="pt-8 pb-2 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">404</h1>
            <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-gray-600 mt-2">
              We couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-4 py-2">
            <div className="h-px w-full bg-gray-100"></div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Try these instead:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Check the URL for typos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Return to the homepage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Use our pricing calculator</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2 pb-8">
          <Button asChild className="w-full sm:w-auto" variant="default">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto" variant="outline">
            <Link to="/pricing-suggestion">
              <Calculator className="mr-2 h-4 w-4" />
              Try Calculator
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
