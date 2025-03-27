import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function PricingSuggestion() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-center mb-6">Pricing Suggestion</h1>
          <p className="text-gray-600 mb-6 text-center">
            This is a placeholder for the pricing suggestion page. The actual implementation will be done in a future update.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
