import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "chart-line",
    title: "Market Rate Analysis",
    description: "Get insights based on current market rates for your specific skills and service type."
  },
  {
    icon: "brain",
    title: "AI-Powered Suggestions",
    description: "Our machine learning models adapt to your specific niche and experience level."
  },
  {
    icon: "sliders-h",
    title: "Personalized Range",
    description: "Receive a minimum, recommended, and premium price point for every project."
  },
  {
    icon: "globe-americas",
    title: "Region-Adjusted Rates",
    description: "Prices adjusted for your location and target client markets for maximum accuracy."
  },
  {
    icon: "file-invoice-dollar",
    title: "Proposal Support",
    description: "Get rationale for your pricing to help you explain your rates confidently to clients."
  },
  {
    icon: "history",
    title: "Price History Tracking",
    description: "Track how your pricing evolves over time as you gain experience and expertise."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 bg-gray-50 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Intelligence for Freelancers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our AI analyzes thousands of data points to help you set the perfect price.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <CardContent className="flex flex-col p-8">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary mb-5">
                    <i className={`fas fa-${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
