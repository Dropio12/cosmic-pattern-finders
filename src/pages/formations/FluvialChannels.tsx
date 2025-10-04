import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplets } from "lucide-react";

const FluvialChannels = () => {
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
                <Droplets className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Fluvial Channels</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary inline-block mt-2">Intermediate</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Fluvial channels are ancient river valleys and water-carved features that provide compelling evidence of past 
                liquid flow on planetary surfaces, particularly on Mars.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Fluvial Channels?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fluvial channels are erosional features created by flowing liquids, typically water. On Mars and other planetary 
                  bodies, these ancient channels represent periods when conditions allowed liquid water to flow across the surface, 
                  carving valleys, transporting sediment, and shaping the landscape in ways similar to rivers on Earth.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Valley Networks</h3>
                    <p className="text-muted-foreground">
                      Branching, dendritic patterns resembling Earth river systems. Found primarily in ancient Martian highlands, 
                      these suggest sustained precipitation or groundwater seepage over long periods.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Outflow Channels</h3>
                    <p className="text-muted-foreground">
                      Large channels carved by catastrophic flooding events. These massive features, some hundreds of kilometers 
                      long and wide, suggest sudden releases of enormous volumes of water from subsurface reservoirs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gullies</h3>
                    <p className="text-muted-foreground">
                      Small, relatively young channels on steep slopes. These features may have formed recently (geologically speaking) 
                      and could indicate seasonal or sporadic water activity continuing into recent times.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for sinuous, meandering patterns that follow topographic lows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for tributary systems converging into larger channels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice channel features like inner channels, terraces, or depositional fans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Observe streamlined islands or teardrop-shaped features within channels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Identify channels that start at crater walls or emerge from the ground, suggesting source regions</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fluvial channels are among the most important features for understanding planetary habitability. They indicate 
                  past conditions where liquid water existed, possibly supporting life. By analyzing channel morphology, scientists 
                  can reconstruct ancient climates, water volumes, flow rates, and the duration of aqueous activity. These features 
                  are prime targets for missions seeking signs of past life and help identify locations where water-related minerals 
                  and organic compounds might be preserved.
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

export default FluvialChannels;
