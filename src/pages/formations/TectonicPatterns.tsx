import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

const TectonicPatterns = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <article className="py-16 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link to="/formations">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Formations
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl gradient-cta flex items-center justify-center">
                <Compass className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Tectonic Patterns</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 inline-block mt-2">Advanced</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tectonic patterns are surface deformations caused by internal planetary forces, revealing the dynamic nature of 
                planetary crusts and their response to internal stresses.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Tectonic Patterns?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tectonic patterns form when a planet's crust fractures, folds, or deforms due to internal forces such as cooling, 
                  contraction, expansion, or convection in the mantle. Unlike Earth's plate tectonics, most other planetary bodies 
                  have "one-plate" crusts where deformation occurs through vertical movement rather than lateral plate motion.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Graben Systems</h3>
                    <p className="text-muted-foreground">
                      Linear valleys formed when blocks of crust drop down between parallel faults due to extensional stresses. 
                      Valles Marineris on Mars is the most spectacular example, stretching over 4,000 km and reaching depths of 7 km.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Thrust Faults</h3>
                    <p className="text-muted-foreground">
                      Features where one block of crust is pushed up and over another due to compressional forces. These are common 
                      on Mercury and indicate planetary contraction as the interior cooled and shrank.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Wrinkle Ridges</h3>
                    <p className="text-muted-foreground">
                      Sinuous ridges found on volcanic plains, formed by compression of solidified lava flows. These features are 
                      widespread on Mars, the Moon, and Mercury, recording ancient tectonic stresses.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for linear or curvilinear patterns of ridges, valleys, or fractures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for parallel sets of features indicating systematic stress patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice offset features where terrain on opposite sides doesn't match up</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Observe scarps (cliff-like features) indicating vertical displacement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Identify areas where the surface appears compressed or stretched</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for cross-cutting relationships showing which features formed first</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tectonic patterns are essential for understanding planetary evolution and interior dynamics. They reveal stress 
                  patterns that indicate how planetary crusts respond to cooling, volcanic loading, or tidal forces. By mapping 
                  tectonic features, scientists can reconstruct the thermal history of planets and moons. On Mars, understanding 
                  tectonic history helps identify potential seismic hazards for future human missions. Tectonic activity can also 
                  create pathways for subsurface water or gases to reach the surface, making tectonically active regions important 
                  for astrobiology research.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TectonicPatterns;
