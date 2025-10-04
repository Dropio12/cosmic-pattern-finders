import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Users, Globe, Award } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "NASA Partnership",
    description: "Direct collaboration with NASA scientists to advance planetary research."
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Join thousands of citizen scientists from around the world."
  },
  {
    icon: Globe,
    title: "Real Impact",
    description: "Your contributions directly support active space missions."
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn badges and be acknowledged in scientific publications."
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              About Planet Explorer
            </h2>
            <p className="text-lg text-muted-foreground">
              Bridging the gap between citizen science and space exploration
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12 text-foreground">
            <p className="text-center text-lg leading-relaxed mb-8">
              Planet Explorer was born from a collaboration between NASA scientists and technology innovators 
              who believe that everyone can contribute to our understanding of the cosmos. By leveraging 
              collective intelligence and advanced AI verification, we're accelerating the pace of 
              planetary discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              Join the Mission
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
