import { Header } from "@/components/Header";
import { Guide as GuideComponent } from "@/components/Guide";
import { Footer } from "@/components/Footer";

const Guide = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <GuideComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
