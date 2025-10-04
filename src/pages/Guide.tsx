import { Header } from "@/components/Header";
import { Guide as GuideComponent } from "@/components/Guide";
import { PatternTypes } from "@/components/PatternTypes";
import { IdentificationSteps } from "@/components/IdentificationSteps";
import { BestPractices } from "@/components/BestPractices";
import { Footer } from "@/components/Footer";

const Guide = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
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
