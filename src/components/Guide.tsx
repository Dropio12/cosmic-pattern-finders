import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tag, Users, Award } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Observe",
    description: "Carefully examine the planetary surface for unique patterns, formations, and anomalies."
  },
  {
    icon: Tag,
    title: "Tag",
    description: "Click on interesting features to tag them and provide detailed descriptions."
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Compare your findings with other explorers and discuss discoveries."
  },
  {
    icon: Award,
    title: "Contribute",
    description: "Your verified tags help scientists understand planetary surfaces better."
  }
];

export const Guide = () => {
  return (
    <section id="guide" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            How to Identify Patterns
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to become a planetary pattern expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 w-20 h-20 gradient-accent opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg gradient-cta flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-success-foreground" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Take the Interactive Quiz
          </Button>
        </div>
      </div>
    </section>
  );
};
