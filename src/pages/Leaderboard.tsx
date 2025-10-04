import { Header } from "@/components/Header";
import { Leaderboard as LeaderboardComponent } from "@/components/Leaderboard";
import { LeaderboardDetails } from "@/components/LeaderboardDetails";
import { Footer } from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background with radial gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-glow opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem] animate-fade-in"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-float hidden lg:block"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-accent/5 blur-2xl animate-float hidden lg:block" style={{ animationDelay: '3s' }}></div>
      
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
