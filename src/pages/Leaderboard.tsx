import { Header } from "@/components/Header";
import { Leaderboard as LeaderboardComponent } from "@/components/Leaderboard";
import { LeaderboardDetails } from "@/components/LeaderboardDetails";
import { Footer } from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <LeaderboardComponent />
        <LeaderboardDetails />
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
