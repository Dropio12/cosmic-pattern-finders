import { Header } from "@/components/Header";
import { Leaderboard as LeaderboardComponent } from "@/components/Leaderboard";
import { Footer } from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <LeaderboardComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
