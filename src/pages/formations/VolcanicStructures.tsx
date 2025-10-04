import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

const VolcanicStructures = () => {
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
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Volcanic Structures</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 inline-block mt-2">Advanced</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Volcanic structures are landforms created by the eruption and solidification of molten rock from a planet's interior. 
                These features reveal the internal heat and geological activity of planetary bodies.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Volcanic Structures?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Volcanic structures form when magma from a planet's interior reaches the surface and erupts as lava. The resulting 
                  landforms depend on factors including magma composition, eruption style, planetary gravity, and atmospheric pressure. 
                  Mars hosts the largest volcanoes in our solar system, while Venus has more volcanoes than any other planet.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Shield Volcanoes</h3>
                    <p className="text-muted-foreground">
                      Massive, gently sloping volcanic mountains built by repeated lava flows. Olympus Mons on Mars, the largest 
                      volcano in the solar system at 25 km tall, is a shield volcano formed by low-viscosity lava flowing long distances.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lava Tubes</h3>
                    <p className="text-muted-foreground">
                      Tunnel-like conduits formed when the surface of a lava flow cools and solidifies while molten lava continues 
                      flowing beneath. These structures are scientifically important as potential habitats and protection from radiation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Pyroclastic Deposits</h3>
                    <p className="text-muted-foreground">
                      Fragmented volcanic materials ejected during explosive eruptions. These deposits blanket surrounding terrain 
                      and provide evidence of eruption intensity and composition.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for circular or elongated calderas at mountain summits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for radial flow patterns extending from central vents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice lava flow fronts with distinctive lobate or channelized textures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Observe collapsed features that may indicate lava tubes or subsurface void spaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Identify volcanic cones, often clustered in volcanic fields</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for wrinkle ridges on lava plains indicating surface contraction</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Volcanic structures provide windows into planetary interiors, revealing information about mantle composition, 
                  internal heat flow, and tectonic processes. The age and distribution of volcanoes help scientists understand the 
                  thermal evolution of planets. On Mars, determining whether any volcanoes are still active could indicate ongoing 
                  geological processes and potential subsurface heat sources. Volcanic regions may also harbor geothermal activity 
                  that could support microbial life, making them prime targets for astrobiology research.
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

export default VolcanicStructures;
