import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Guide } from "@/components/Guide";
import { Leaderboard } from "@/components/Leaderboard";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <InteractiveMap />
        <Guide />
        <Leaderboard />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
