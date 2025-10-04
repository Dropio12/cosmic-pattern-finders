import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";

const GeologicalLayers = () => {
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
                <Layers className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Geological Layers</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success inline-block mt-2">Beginner</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Geological layers, also known as strata, are one of the most fundamental features visible on planetary surfaces. 
                These layers tell the story of billions of years of geological processes.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Geological Layers?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Geological layers are distinct bands of rock or sediment that form over time through various processes including 
                  volcanic activity, sediment deposition, and erosion. Each layer represents a specific period in the planet's history, 
                  much like pages in a book.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Examples</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Horizontal Bedding</h3>
                    <p className="text-muted-foreground">
                      Parallel layers that formed in calm, stable environments. These are the easiest to identify and are common in 
                      sedimentary deposits.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cross-Bedding</h3>
                    <p className="text-muted-foreground">
                      Angled layers within the main strata, typically formed by wind or water currents. These indicate dynamic 
                      environmental conditions during formation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Erosion Patterns</h3>
                    <p className="text-muted-foreground">
                      Irregular layers exposed by erosion, revealing the internal structure of the geological formation. These 
                      patterns can show how different layers resist erosion differently.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for parallel bands of different colors or textures in cliff faces or exposed surfaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for consistent thickness across visible areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice variations in layer composition indicated by color or texture differences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Pay attention to how layers interact at boundaries - sharp or gradual transitions tell different stories</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Geological layers are crucial for understanding planetary history. They help scientists determine the age of surfaces, 
                  reconstruct ancient environments, and identify periods of volcanic activity or water presence. By studying the 
                  composition and arrangement of layers, researchers can piece together the climate history and geological evolution 
                  of planets and moons.
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

export default GeologicalLayers;
