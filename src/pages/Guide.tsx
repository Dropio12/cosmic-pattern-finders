import { Header } from "@/components/Header";
import { Guide as GuideComponent } from "@/components/Guide";
import { PatternTypes } from "@/components/PatternTypes";
import { IdentificationSteps } from "@/components/IdentificationSteps";
import { BestPractices } from "@/components/BestPractices";
import { Footer } from "@/components/Footer";

const Guide = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
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
