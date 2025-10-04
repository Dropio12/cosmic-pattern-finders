import { Trophy, Target, CheckCircle, Zap, Tag } from "lucide-react";
import communityBg from "@/assets/community-impact-bg.jpg";

const topContributors = [
  { rank: 1, name: "SpaceExplorer42", points: 15240, avatar: "🚀" },
  { rank: 2, name: "MarsMapper", points: 12890, avatar: "🔭" },
  { rank: 3, name: "CosmicScout", points: 11560, avatar: "🌟" },
  { rank: 4, name: "PlanetHunter", points: 10234, avatar: "🌍" },
  { rank: 5, name: "StarGazer", points: 9876, avatar: "⭐" }
];

const stats = [
  { icon: Tag, label: "Patterns Tagged", value: "24,567", color: "text-accent" },
  { icon: CheckCircle, label: "Patterns Verified", value: "18,432", color: "text-success" },
  { icon: Target, label: "Sent to NASA", value: "12,891", color: "text-primary" }
];

export const Leaderboard = () => {
  return (
    <section id="leaderboard" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={communityBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Community Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics from our global network of explorers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 border border-border/50">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl gradient-cta flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-5xl font-heading font-bold mb-2">{stat.value}</p>
                <div className="flex items-center gap-2 text-sm text-success">
                  <div className="w-1 h-1 rounded-full bg-success animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-heading font-bold">Top Contributors</h3>
            </div>
            <div className="space-y-1">
              {topContributors.map((contributor, index) => (
                <div
                  key={contributor.rank}
                  className={`flex items-center justify-between p-5 rounded-xl transition-all ${
                    index < 3 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      index === 0 ? 'gradient-cta text-primary-foreground' : 
                      index === 1 ? 'bg-muted text-foreground' :
                      index === 2 ? 'bg-muted/50 text-foreground' :
                      'bg-muted/30 text-muted-foreground'
                    }`}>
                      {contributor.rank}
                    </div>
                    <div className="text-3xl">{contributor.avatar}</div>
                    <span className="font-semibold text-lg">{contributor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{contributor.points.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <div className="glass-card px-5 py-3 rounded-xl border border-border/50">
            <span className="text-sm font-medium">🏆 Pattern Master</span>
          </div>
          <div className="glass-card px-5 py-3 rounded-xl border border-border/50">
            <span className="text-sm font-medium">🔬 Scientific Contributor</span>
          </div>
          <div className="glass-card px-5 py-3 rounded-xl border border-border/50">
            <span className="text-sm font-medium">🌟 Explorer Elite</span>
          </div>
          <div className="glass-card px-5 py-3 rounded-xl border border-border/50">
            <span className="text-sm font-medium">🚀 Space Pioneer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
