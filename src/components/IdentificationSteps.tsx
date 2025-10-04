import { Card } from "@/components/ui/card";
import { Eye, Ruler, BookOpen, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Eye,
    title: "Initial Observation",
    description: "Begin by examining the overall surface texture and identifying the most prominent features.",
    tips: [
      "Look for repeating patterns or anomalies",
      "Note the scale using reference markers",
      "Identify brightness variations and shadows",
      "Consider the context of surrounding terrain"
    ]
  },
  {
    step: 2,
    icon: Ruler,
    title: "Measure & Compare",
    description: "Use the built-in measurement tools to determine the scale and dimensions of features.",
    tips: [
      "Measure crater diameters accurately",
      "Compare sizes with known reference features",
      "Note depth-to-diameter ratios for craters",
      "Record spacing between repeated patterns"
    ]
  },
  {
    step: 3,
    icon: BookOpen,
    title: "Cross-Reference",
    description: "Compare your observations with the pattern library and documented examples.",
    tips: [
      "Check multiple pattern categories",
      "Review similar verified examples",
      "Consider environmental context",
      "Note unique or unusual characteristics"
    ]
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: "Tag & Verify",
    description: "Submit your identification with confidence levels and wait for AI verification.",
    tips: [
      "Tag the most distinctive features first",
      "Add descriptive notes for complex patterns",
      "Include measurement data when available",
      "Mark confidence level honestly"
    ]
  }
];

export const IdentificationSteps = () => {
  return (
    <section className="py-32 bg-background/50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(142_71%_45%/0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Identification Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow our proven four-step methodology to accurately identify and classify 
            planetary surface patterns with confidence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((item, index) => (
            <Card key={index} className="glass-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl gradient-cta flex items-center justify-center">
                      <item.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm font-semibold text-primary mb-2">STEP {item.step}</div>
                        <h3 className="text-2xl font-heading font-bold mb-3">{item.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                        Key Points:
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
