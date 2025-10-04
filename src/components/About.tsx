import { Button } from "@/components/ui/button";
import { Rocket, Users, Globe, Award } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "NASA Partnership",
    description: "Direct collaboration with NASA scientists to advance planetary research."
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Join thousands of citizen scientists from around the world."
  },
  {
    icon: Globe,
    title: "Real Impact",
    description: "Your contributions directly support active space missions."
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn badges and be acknowledged in scientific publications."
  }
];

export const About = () => {
  return (
    <section id="about" className="py-32 bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%/0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
              Powered by AI & Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're democratizing space exploration by combining collective intelligence 
              with cutting-edge AI to accelerate planetary discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-6">
            <div className="glass-card inline-block rounded-2xl px-8 py-12 border border-border/50">
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Trusted by researchers at NASA, ESA, and leading universities worldwide
              </p>
              <Button variant="default" size="lg">
                Join the Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
