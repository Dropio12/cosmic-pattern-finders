import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layers, Mountain, Wind, Droplets, Zap, Compass, ArrowRight } from "lucide-react";

const formations = [
  {
    icon: Layers,
    name: "Geological Layers",
    slug: "geological-layers",
    description: "Sedimentary rock formations showing distinct stratification patterns across the planetary surface.",
    difficulty: "Beginner"
  },
  {
    icon: Mountain,
    name: "Impact Craters",
    slug: "impact-craters",
    description: "Circular depressions formed by meteorite impacts, varying in size from microscopic to hundreds of kilometers.",
    difficulty: "Beginner"
  },
  {
    icon: Wind,
    name: "Aeolian Features",
    slug: "aeolian-features",
    description: "Wind-formed patterns including dunes, ripples, and dust devil tracks visible on planetary surfaces.",
    difficulty: "Intermediate"
  },
  {
    icon: Droplets,
    name: "Fluvial Channels",
    slug: "fluvial-channels",
    description: "Ancient river valleys and water-carved channels suggesting past liquid flow on planetary surfaces.",
    difficulty: "Intermediate"
  },
  {
    icon: Zap,
    name: "Volcanic Structures",
    slug: "volcanic-structures",
    description: "Features formed by volcanic activity including calderas, lava flows, and volcanic cones.",
    difficulty: "Advanced"
  },
  {
    icon: Compass,
    name: "Tectonic Patterns",
    slug: "tectonic-patterns",
    description: "Surface deformations caused by internal planetary forces including faults, ridges, and fractures.",
    difficulty: "Advanced"
  }
];

const difficultyColors = {
  Beginner: "bg-success/20 text-success",
  Intermediate: "bg-primary/20 text-primary",
  Advanced: "bg-orange-500/20 text-orange-400"
};

const FormationsOverview = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-32 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
                Planetary Formations Guide
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore detailed guides for each type of planetary surface formation. 
                Learn to identify and understand the geological processes that created them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {formations.map((formation, index) => (
                <Card key={index} className="glass-card p-8 border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center group-hover:scale-110 transition-transform">
                      <formation.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColors[formation.difficulty as keyof typeof difficultyColors]}`}>
                      {formation.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3">{formation.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {formation.description}
                  </p>
                  
                  <Link to={`/formations/${formation.slug}`}>
                    <Button variant="outline" className="w-full group/btn">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FormationsOverview;
