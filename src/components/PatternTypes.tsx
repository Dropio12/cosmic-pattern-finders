import { Card } from "@/components/ui/card";
import { Layers, Mountain, Wind, Droplets, Zap, Compass } from "lucide-react";

const patternTypes = [
  {
    icon: Layers,
    name: "Geological Layers",
    description: "Sedimentary rock formations showing distinct stratification patterns across the planetary surface.",
    examples: ["Horizontal bedding", "Cross-bedding", "Erosion patterns"],
    difficulty: "Beginner"
  },
  {
    icon: Mountain,
    name: "Impact Craters",
    description: "Circular depressions formed by meteorite impacts, varying in size from microscopic to hundreds of kilometers.",
    examples: ["Simple craters", "Complex craters", "Ray systems"],
    difficulty: "Beginner"
  },
  {
    icon: Wind,
    name: "Aeolian Features",
    description: "Wind-formed patterns including dunes, ripples, and dust devil tracks visible on planetary surfaces.",
    examples: ["Transverse dunes", "Barchan dunes", "Yardangs"],
    difficulty: "Intermediate"
  },
  {
    icon: Droplets,
    name: "Fluvial Channels",
    description: "Ancient river valleys and water-carved channels suggesting past liquid flow on planetary surfaces.",
    examples: ["Valley networks", "Outflow channels", "Gullies"],
    difficulty: "Intermediate"
  },
  {
    icon: Zap,
    name: "Volcanic Structures",
    description: "Features formed by volcanic activity including calderas, lava flows, and volcanic cones.",
    examples: ["Shield volcanoes", "Lava tubes", "Pyroclastic deposits"],
    difficulty: "Advanced"
  },
  {
    icon: Compass,
    name: "Tectonic Patterns",
    description: "Surface deformations caused by internal planetary forces including faults, ridges, and fractures.",
    examples: ["Graben systems", "Thrust faults", "Wrinkle ridges"],
    difficulty: "Advanced"
  }
];

const difficultyColors = {
  Beginner: "bg-success/20 text-success",
  Intermediate: "bg-primary/20 text-primary",
  Advanced: "bg-orange-500/20 text-orange-400"
};

export const PatternTypes = () => {
  return (
    <section className="py-32 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(217_91%_60%/0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Pattern Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn to identify six major types of planetary surface patterns. Each category represents 
            unique geological processes that shaped planetary surfaces over billions of years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {patternTypes.map((pattern, index) => (
            <Card key={index} className="glass-card p-8 border border-border/50 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center group-hover:scale-110 transition-transform">
                  <pattern.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColors[pattern.difficulty as keyof typeof difficultyColors]}`}>
                  {pattern.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-heading font-bold mb-3">{pattern.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {pattern.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  Common Examples:
                </div>
                <div className="flex flex-wrap gap-2">
                  {pattern.examples.map((example, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
