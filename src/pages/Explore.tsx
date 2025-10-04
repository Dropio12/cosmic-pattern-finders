import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Telescope, Globe2 } from "lucide-react";
import marsMap from "@/assets/mars-map.jpg";
import deepspaceMap from "@/assets/deepspace-map.jpg";

const games = [
  {
    id: "mars",
    title: "Mars Explorer",
    description: "Discover and tag geological patterns on the Martian surface. Identify craters, volcanic structures, and ancient water channels.",
    image: marsMap,
    icon: Globe2,
    path: "/explore/mars",
    patterns: ["Impact Craters", "Volcanic Structures", "Fluvial Channels"]
  },
  {
    id: "deepspace",
    title: "Deep Space Explorer",
    description: "Explore the cosmos and identify celestial objects. Tag galaxies, nebulae, star clusters, and other deep space phenomena.",
    image: deepspaceMap,
    icon: Telescope,
    path: "/explore/deepspace",
    patterns: ["Galaxies", "Nebulae", "Star Clusters"]
  }
];

const Explore = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                Choose Your <span className="text-primary">Mission</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select an exploration game and start discovering patterns across the universe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {games.map((game) => (
                <Card key={game.id} className="glass-card border border-border/50 overflow-hidden group hover:border-primary/50 transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg gradient-cta flex items-center justify-center">
                        <game.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold">{game.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {game.patterns.map((pattern, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {pattern}
                        </span>
                      ))}
                    </div>
                    
                    <Button asChild size="lg" className="w-full">
                      <Link to={game.path}>
                        Start Exploring
                      </Link>
                    </Button>
                  </div>
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

export default Explore;
