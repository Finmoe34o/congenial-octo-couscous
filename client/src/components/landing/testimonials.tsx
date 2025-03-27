import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    content: "I was consistently undercharging for my web design services. PriceProAI showed me I could charge 40% more and still be competitive in my market.",
    author: "Jamie Smith",
    role: "Web Designer",
    initials: "JS",
    rating: 5
  },
  {
    content: "The pricing suggestions gave me the confidence to negotiate better rates. I've increased my monthly income by almost 30% in just three months.",
    author: "Rita Patel",
    role: "Content Writer",
    initials: "RP",
    rating: 5
  },
  {
    content: "I was afraid of pricing myself out of work, but PriceProAI showed me what I should actually be charging based on my skills. Game changer!",
    author: "Marco Johnson",
    role: "Mobile Developer",
    initials: "MJ",
    rating: 4.5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-gray-50 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Freelancers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            See how PriceProAI has helped freelancers increase their income.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow rounded-lg">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 flex">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <i className="fas fa-star-half-alt"></i>
                      )}
                    </div>
                  </div>
                  <blockquote className="flex-grow">
                    <p className="text-gray-700 mb-4">
                      "{testimonial.content}"
                    </p>
                  </blockquote>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-10 w-10 rounded-full bg-gray-200">
                      <AvatarFallback className="text-gray-500 text-sm font-medium">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
