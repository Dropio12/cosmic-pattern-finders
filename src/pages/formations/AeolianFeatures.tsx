import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Wind } from "lucide-react";

const AeolianFeatures = () => {
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
                <Wind className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Aeolian Features</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary inline-block mt-2">Intermediate</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Aeolian features are landforms created by wind erosion and deposition. Named after Aeolus, the Greek god of wind, 
                these features provide crucial evidence of atmospheric dynamics on planetary bodies.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Aeolian Features?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aeolian features form through the action of wind on loose surface materials. Wind can erode, transport, and deposit 
                  sediment, creating distinctive patterns and structures. These features are particularly prominent on Mars, Venus, 
                  and Saturn's moon Titan, where strong winds sculpt the landscape over time.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transverse Dunes</h3>
                    <p className="text-muted-foreground">
                      Elongated dunes that form perpendicular to the prevailing wind direction. They appear as parallel ridges and 
                      are common in areas with steady, unidirectional winds and abundant sand supply.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Barchan Dunes</h3>
                    <p className="text-muted-foreground">
                      Crescent-shaped dunes with horns pointing downwind. They form in areas with limited sand supply and are 
                      mobile, constantly shifting with the wind. Extremely common on Mars.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Yardangs</h3>
                    <p className="text-muted-foreground">
                      Streamlined, wind-eroded ridges carved from bedrock or consolidated sediment. They align parallel to the 
                      prevailing wind and can extend for kilometers, resembling an inverted ship hull.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for repetitive patterns or ripples in dark or light-colored terrain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for crescent or linear shapes indicating dune formations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice asymmetric profiles with gentle windward slopes and steep leeward slopes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Observe dark streaks indicating dust devil tracks or wind-swept surfaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Identify streamlined erosional features aligned in consistent directions</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aeolian features reveal critical information about atmospheric conditions, including wind patterns, atmospheric 
                  pressure, and seasonal changes. On Mars, migrating dunes indicate current wind activity, while ancient aeolian 
                  deposits preserved in rock formations tell us about past climates. Studying these features helps scientists 
                  understand atmospheric circulation patterns and predict dust storm behavior, which is crucial for future exploration 
                  missions.
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

export default AeolianFeatures;
