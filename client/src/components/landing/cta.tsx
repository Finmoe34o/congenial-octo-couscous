import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTA() {
  return (
    <section className="py-12 bg-primary md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to price your services confidently?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-primary-100 mx-auto">
            Join thousands of freelancers who've increased their income with PriceProAI.
          </p>
        </div>

        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <div className="inline-flex rounded-md shadow">
            <Link href="/pricing-suggestion">
              <Button className="text-primary bg-white hover:bg-gray-50">
                Get Your Price Suggestion
              </Button>
            </Link>
          </div>
          <div className="inline-flex">
            <Button variant="secondary" className="bg-primary-800 text-white hover:bg-primary-900">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
