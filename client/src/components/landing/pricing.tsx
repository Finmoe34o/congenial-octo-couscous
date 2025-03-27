import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const pricingPlans = [
  {
    name: "Basic",
    price: "$0",
    period: "/month",
    description: "Perfect for freelancers just getting started.",
    features: [
      "5 pricing suggestions per month",
      "Basic market data",
      "Email support"
    ],
    cta: "Start for free",
    popular: false
  },
  {
    name: "Pro",
    price: "$7.99",
    period: "/month",
    description: "Everything a growing freelance business needs.",
    features: [
      "30 pricing suggestions per month",
      "Advanced market insights",
      "Regional adjustments",
      "Priority support"
    ],
    cta: "Get started",
    popular: true
  },
  {
    name: "Business",
    price: "$19.99",
    period: "/month",
    description: "For established freelancers and small agencies.",
    features: [
      "Unlimited pricing suggestions",
      "Client proposal generation",
      "Team member access",
      "API access",
      "Dedicated account manager"
    ],
    cta: "Get started",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 bg-white md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Plans for Every Freelancer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you're just starting out or running a successful freelance business.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 flex flex-col ${
                plan.popular ? "border-primary-200" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                </p>
                <p className="mt-6 text-gray-500">{plan.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <i className="fas fa-check flex-shrink-0 text-green-500"></i>
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/auth">
                <Button 
                  className={`mt-8 w-full py-2 text-sm font-semibold ${
                    plan.popular 
                      ? "bg-gradient-to-r from-primary-900 to-primary text-white" 
                      : "bg-primary-50 border border-primary-200 text-primary hover:bg-primary-100"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
