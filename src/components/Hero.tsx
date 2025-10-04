import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroMars from "@/assets/hero-mars.jpg";
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] gradient-glow"></div>
        <div className="absolute inset-0 opacity-30">
          <img src={heroMars} alt="Mars surface with distant mountains" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm text-muted-foreground">AI-Powered Planetary Analysis • Live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-foreground leading-tight">
            Discover the{" "}
            <span className="text-primary glow-text">
              Unknown
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            Join thousands of citizen scientists exploring planetary surfaces with AI. 
            Tag patterns, contribute to real missions, and help uncover cosmic mysteries.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/explore">
              <Button variant="default" size="lg" className="group">
                Start Exploring
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/guide">
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</div>
              <span>NASA Partnership</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</div>
              <span>2+ Patterns Tagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</div>
              <span>Real-time AI Verification</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6 border border-border/50">
              <div className="text-4xl font-bold text-primary glow-text mb-2">idk</div>
              <div className="text-sm text-muted-foreground">AI Accuracy Rate</div>
            </div>
            <div className="glass-card rounded-xl p-6 border border-border/50">
              <div className="text-4xl font-bold text-primary glow-text mb-2">more than 1</div>
              <div className="text-sm text-muted-foreground">Countries Participating</div>
            </div>
            <div className="glass-card rounded-xl p-6 border border-border/50">
              <div className="text-4xl font-bold text-primary glow-text mb-2">at least 2</div>
              <div className="text-sm text-muted-foreground">Patterns Analyzed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-success/10 blur-3xl animate-float hidden lg:block" style={{
      animationDelay: '2s'
    }}></div>
    </section>;
};