import { Trophy, Target, CheckCircle, Tag } from "lucide-react";
import communityBg from "@/assets/community-impact-bg.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const avatars = ["🚀", "🔭", "🌟", "🌍", "⭐", "🛸", "🌌", "🪐", "☄️", "🌠"];

const stats = [
  { icon: Tag, label: "Patterns Tagged", value: "24,567", color: "text-accent" },
  { icon: CheckCircle, label: "Patterns Verified", value: "18,432", color: "text-success" },
  { icon: Target, label: "Sent to NASA", value: "12,891", color: "text-primary" }
];

interface Contributor {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}

export const Leaderboard = () => {
  const [topContributors, setTopContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('passport, points')
        .order('points', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
        return;
      }

      if (data) {
        const contributors = data.map((profile, index) => ({
          rank: index + 1,
          name: profile.passport,
          points: profile.points,
          avatar: avatars[index % avatars.length]
        }));
        setTopContributors(contributors);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);
  return (
    <section id="leaderboard" className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={communityBg} alt="" className="w-full h-full object-cover opacity-20" />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, hsl(222 47% 4% / 0.8) 0%, hsl(222 47% 4% / 0.6) 50%, hsl(222 47% 4% / 0.8) 100%)'
      }}></div>
      
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(circle at 50% 0%, hsl(25 95% 53% / 0.1) 0%, transparent 60%)'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
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
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading leaderboard...</div>
              ) : topContributors.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No contributors yet</div>
              ) : (
                topContributors.map((contributor, index) => (
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
              ))
              )}
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
