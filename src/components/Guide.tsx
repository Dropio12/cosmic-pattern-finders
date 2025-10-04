import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Tag, Users, Award } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Observe",
    description: "Carefully examine the planetary surface for unique patterns, formations, and anomalies."
  },
  {
    icon: Tag,
    title: "Tag",
    description: "Click on interesting features to tag them and provide detailed descriptions."
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Compare your findings with other explorers and discuss discoveries."
  },
  {
    icon: Award,
    title: "Contribute",
    description: "Your verified tags help scientists understand planetary surfaces better."
  }
];

export const Guide = () => {
  return (
    <section id="guide" className="py-32 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to contribute to planetary science
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all h-full">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/formations">
            <Button variant="default" size="lg">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
