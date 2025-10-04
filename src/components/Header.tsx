import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-accent"></div>
            <span className="text-xl font-heading font-bold">Planet Explorer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <a href="#explore" className="text-foreground hover:text-accent transition-colors">
              Explore
            </a>
            <a href="#guide" className="text-foreground hover:text-accent transition-colors">
              Guide
            </a>
            <a href="#leaderboard" className="text-foreground hover:text-accent transition-colors">
              Leaderboard
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">
              About
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="default">Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a
              href="#explore"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </a>
            <a
              href="#guide"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guide
            </a>
            <a
              href="#leaderboard"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </a>
            <a
              href="#about"
              className="block text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
              <Button variant="default" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
