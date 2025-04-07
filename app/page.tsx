import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">SkillPay</Link>
          </div>
          <nav className="hidden md:flex space-x-12">
            <Link href="/" className="nav-link font-medium">Home</Link>
            {/*<Link href="/pricing" className="nav-link font-medium">Pricing</Link>*/}
            <Link href="/pricing-suggestion" className="nav-link font-medium">Calculator</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/auth" className="button-secondary">Sign In</Link>
            <Link href="/auth?register=true" className="button-primary">Sign Up</Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4 md:py-32 text-white">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Price Your Freelance Work With Confidence
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-80">
              Get data-driven pricing recommendations tailored to your skills, experience level, and target market.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth?register=true" className="button-primary text-center py-3 px-8 text-lg">
                Get Started
              </Link>
              {/*<Link href="/pricing" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md py-3 px-8 text-lg text-center transition-colors duration-300">
                View Plans
              </Link>*/}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Sample Rate Calculator</h3>
                <p className="text-sm opacity-70">See a preview of our intelligent rate recommendations</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm opacity-70 mb-1">Skill</p>
                    <p className="font-medium">Web Development</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">Experience</p>
                    <p className="font-medium">Intermediate</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">Project Scope</p>
                    <p className="font-medium">Medium</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70 mb-1">Location</p>
                    <p className="font-medium">United States</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-sm opacity-70 mb-1">Minimum</p>
                      <p className="text-xl font-semibold">$40/hr</p>
                    </div>
                    <div className="bg-indigo-500/30 p-3 rounded">
                      <p className="text-sm opacity-70 mb-1">Recommended</p>
                      <p className="text-xl font-semibold">$50/hr</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-sm opacity-70 mb-1">Premium</p>
                      <p className="text-xl font-semibold">$62/hr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How SkillPay Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm card-hover">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-indigo-600 dark:text-indigo-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Details</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your skills, experience level, project scope, and location.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm card-hover">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-indigo-600 dark:text-indigo-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our algorithm analyzes market rates and provides personalized pricing suggestions.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm card-hover">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl text-indigo-600 dark:text-indigo-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Price With Confidence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our minimum, recommended, and premium pricing tiers to charge what you're worth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Freelancers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl text-indigo-600 dark:text-indigo-400">M</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I've been undercharging for years! SkillPay helped me realize my true market value and gave me the confidence to raise my rates by 30%."
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl text-indigo-600 dark:text-indigo-400">S</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Graphic Designer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The pricing tiers gave me options to present to clients at different budget levels. My conversion rate has improved significantly!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Maximize Your Earning Potential?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-80">
            Join thousands of freelancers who are pricing their services with confidence.
          </p>
          <Link href="/auth?register=true" className="bg-white text-indigo-600 hover:bg-gray-100 py-3 px-8 text-lg font-medium rounded-md inline-block transition-colors duration-300">
            Get Started For Free
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">SkillPay</h3>
              <p className="text-gray-400">
                Smart pricing for freelancers and independent professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white scroll-smooth transition-colors">Features</a></li>
                {/*<li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>*/}
              </ul>
            </div>
            {/*<div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>*/}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SkillPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}