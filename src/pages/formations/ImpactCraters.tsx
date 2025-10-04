import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Mountain } from "lucide-react";

const ImpactCraters = () => {
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
                <Mountain className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold">Impact Craters</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-success/20 text-success inline-block mt-2">Beginner</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Impact craters are among the most recognizable features on planetary surfaces, created by the violent collision 
                of asteroids, comets, or meteorites with a planetary body.
              </p>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">What Are Impact Craters?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Impact craters are circular or bowl-shaped depressions formed when a high-velocity object from space strikes a 
                  planetary surface. The size, shape, and features of a crater depend on the impactor's size, speed, angle of impact, 
                  and the composition of the target surface.
                </p>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Common Types</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Simple Craters</h3>
                    <p className="text-muted-foreground">
                      Bowl-shaped depressions with smooth walls and a depth-to-diameter ratio of about 1:5. Typically less than 4 km 
                      in diameter on Earth, but can be larger on bodies with lower gravity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Complex Craters</h3>
                    <p className="text-muted-foreground">
                      Larger craters featuring central peaks, terraced walls, and flat floors. These form when the impact energy 
                      is sufficient to cause the crater to partially collapse and rebound.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ray Systems</h3>
                    <p className="text-muted-foreground">
                      Bright streaks of ejected material radiating from fresh craters. These rays can extend for hundreds of 
                      kilometers and are especially visible on airless bodies like the Moon.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">How to Identify</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for circular or nearly circular rim structures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Check for raised rims surrounding a depressed center</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Notice bright rays or ejecta blankets around younger craters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Observe central peaks in larger craters (usually over 20-30 km diameter)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Look for terraced walls in complex craters</span>
                  </li>
                </ul>
              </section>

              <section className="glass-card p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-4">Scientific Importance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Impact craters serve as natural time markers, helping scientists determine the relative age of planetary surfaces. 
                  More craters generally indicate an older surface. They also provide access to subsurface materials, offering insights 
                  into a planet's interior composition. Studying crater distribution and preservation helps us understand atmospheric 
                  density, geological activity, and the bombardment history of our solar system.
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

export default ImpactCraters;
