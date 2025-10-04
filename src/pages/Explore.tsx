import { Header } from "@/components/Header";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Footer } from "@/components/Footer";

const Explore = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <InteractiveMap />
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
