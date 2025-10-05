import { Card } from "@/components/ui/card";
import { Lightbulb, Shield, Users, TrendingUp } from "lucide-react";

const practices = [
  {
    icon: Lightbulb,
    title: "Quality Over Quantity",
    description: "Focus on accurate, well-documented tags rather than volume. One high-quality identification is more valuable than ten rushed tags.",
    tips: [
      "Take time to verify your observations",
      "Use multiple reference sources",
      "Add detailed notes and measurements",
      "Review your tags before submitting"
    ]
  },
  {
    icon: Shield,
    title: "Data Integrity",
    description: "Maintain the highest standards of scientific accuracy. Your contributions directly impact active research missions.",
    tips: [
      "Report only what you can verify",
      "Flag uncertain identifications",
      "Never fabricate or guess patterns",
      "Document your methodology"
    ]
  },
  {
    icon: Users,
    title: "Community Collaboration",
    description: "Engage with fellow explorers to improve collective accuracy and learn from experienced contributors.",
    tips: [
      "Discuss complex patterns in forums",
      "Share interesting discoveries",
      "Learn from verification feedback",
      "Mentor new contributors"
    ]
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description: "Stay updated with the latest planetary science discoveries and refine your pattern recognition skills.",
    tips: [
      "Complete monthly training modules",
      "Study verified pattern examples",
      "Attend virtual workshops",
      "Review mission updates regularly"
    ]
  }
];

export const BestPractices = () => {
  return (
    <section className="py-32 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%/0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Best Practices
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow these guidelines to maximize the scientific value of your contributions 
            and become a trusted member of the Space Detective community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {practices.map((practice, index) => (
            <Card key={index} className="glass-card p-8 border border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-cta flex items-center justify-center flex-shrink-0">
                  <practice.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              </div>
              
              <div className="ml-19 space-y-2">
                {practice.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-10 border border-primary/30">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">Remember</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every pattern you identify contributes to humanity's understanding of our solar system. 
              Your careful observations help scientists plan missions, validate theories, and make 
              groundbreaking discoveries. Thank you for being part of this incredible journey.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-medium">Contributing to 12 active NASA missions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
