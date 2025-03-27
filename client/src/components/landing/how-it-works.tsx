import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const steps = [
  {
    number: 1,
    title: "Enter Your Skills",
    description: "Tell us about your expertise, skills, and experience level."
  },
  {
    number: 2,
    title: "Describe the Project",
    description: "Provide details about the project scope and requirements."
  },
  {
    number: 3,
    title: "Set Preferences",
    description: "Adjust your pricing strategy and target client demographics."
  },
  {
    number: 4,
    title: "Get Your Price",
    description: "Receive detailed pricing recommendations with justification."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 bg-white md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple Process, Powerful Results
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Get your personalized pricing suggestion in just a few simple steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Steps connect line */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>

            <div className="relative flex justify-between flex-wrap">
              {steps.map((step, index) => (
                <div key={index} className="text-center mb-8 px-2 w-full sm:w-1/2 md:w-auto">
                  <span className="relative flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold mx-auto">
                    {step.number}
                  </span>
                  <div className="mt-6 px-4">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/pricing-suggestion">
              <Button className="px-8 py-3 md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-primary-900 to-primary transition-all duration-300 hover:opacity-90 hover:translate-y-[-1px] shadow-lg hover:shadow-primary-500/40">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
