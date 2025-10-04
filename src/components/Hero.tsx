import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroMars from "@/assets/hero-mars.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroMars}
          alt="Mars surface with distant mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary-foreground drop-shadow-lg">
            Discover and Contribute to Planetary Science
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-body font-light max-w-2xl mx-auto">
            Tag patterns, collaborate with others, and aid NASA in uncovering cosmic mysteries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" className="group">
              Start Exploring
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary-outline" size="lg">
              Learn How
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-accent/20 animate-float hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-success/10 animate-float hidden lg:block" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};
