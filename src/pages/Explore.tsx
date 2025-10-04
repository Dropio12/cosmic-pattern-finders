import { Header } from "@/components/Header";
import { ExploreIntro } from "@/components/ExploreIntro";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Footer } from "@/components/Footer";

const Explore = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ExploreIntro />
        <InteractiveMap />
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
