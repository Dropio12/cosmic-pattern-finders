import { Header } from "@/components/Header";
import { Leaderboard as LeaderboardComponent } from "@/components/Leaderboard";
import { LeaderboardDetails } from "@/components/LeaderboardDetails";
import { Footer } from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen relative">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_60%)]"></div>
      
      <Header />
      <main className="pt-20 relative z-10">
        <LeaderboardComponent />
        <LeaderboardDetails />
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
