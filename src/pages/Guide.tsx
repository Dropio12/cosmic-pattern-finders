import { Header } from "@/components/Header";
import { Guide as GuideComponent } from "@/components/Guide";
import { PatternTypes } from "@/components/PatternTypes";
import { IdentificationSteps } from "@/components/IdentificationSteps";
import { BestPractices } from "@/components/BestPractices";
import { Footer } from "@/components/Footer";

const Guide = () => {
  return (
    <div className="min-h-screen relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(217_91%_60%/0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(25_95%_53%/0.05),transparent_50%)]"></div>
      
      <Header />
      <main className="pt-20 relative z-10">
        <GuideComponent />
        <PatternTypes />
        <IdentificationSteps />
        <BestPractices />
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
