import { Card } from "@/components/ui/card";
import { Telescope, Cpu, Globe2 } from "lucide-react";

const features = [
  {
    icon: Telescope,
    title: "High-Resolution Imaging",
    description: "Access detailed planetary surface imagery from NASA's latest Mars missions, including data from Perseverance and Mars Reconnaissance Orbiter."
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Our advanced AI instantly validates your tags, providing real-time feedback and confidence scores for each identification."
  },
  {
    icon: Globe2,
    title: "Global Coordinates",
    description: "Every tag is precisely geolocated with planetary coordinates, enabling accurate scientific reference and mission planning."
  }
];

export const ExploreIntro = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            Explore Planetary Surfaces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our advanced mapping tools to discover and document patterns on Mars and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-6 border border-border/50 text-center">
              <div className="w-12 h-12 rounded-lg gradient-cta flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="glass-card rounded-xl p-8 border border-primary/30 max-w-4xl mx-auto">
          <h3 className="text-2xl font-heading font-bold mb-4 text-center">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Click anywhere on the map to tag patterns</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Use zoom controls for detailed inspection</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>Filter tags by category or confidence level</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
              <span>AI verification happens in real-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
