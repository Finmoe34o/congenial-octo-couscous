import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-primary font-bold text-xl cursor-pointer">PriceProAI</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition duration-150">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary transition duration-150">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition duration-150">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition duration-150">Pricing</a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-primary">
              Sign in
            </Button>
            <Button variant="outline" className="bg-primary-50 text-primary border-primary-200 hover:bg-primary-100">
              Sign up
            </Button>
          </div>
          <button
            type="button"
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </a>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Sign in
            </Button>
            <Button variant="outline" className="w-full justify-start px-3 py-2 text-base font-medium text-primary bg-primary-50 hover:bg-primary-100 mt-1">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
