import { Card } from "@/components/ui/card";
import { Trophy, Award, Star, Zap } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Top Weekly Contributors",
    description: "Recognition for the most active pattern taggers this week",
    count: 3,
    color: "text-yellow-400"
  },
  {
    icon: Award,
    title: "Accuracy Masters",
    description: "Contributors with 95%+ AI verification rate",
    count: 127,
    color: "text-primary"
  },
  {
    icon: Star,
    title: "Discovery Pioneers",
    description: "First to identify unique pattern formations",
    count: 45,
    color: "text-success"
  },
  {
    icon: Zap,
    title: "Speed Champions",
    description: "Fastest verified pattern identification times",
    count: 89,
    color: "text-orange-400"
  }
];

const recentDiscoveries = [
  {
    user: "CosmicScout",
    pattern: "Ancient riverbed network",
    location: "Jezero Crater, Mars",
    verified: true,
    points: 450
  },
  {
    user: "MarsMapper",
    pattern: "Unusual volcanic formation",
    location: "Olympus Mons region",
    verified: true,
    points: 380
  },
  {
    user: "SpaceExplorer42",
    pattern: "Complex dune system",
    location: "Valles Marineris",
    verified: true,
    points: 320
  }
];

export const LeaderboardDetails = () => {
  return (
    <>
      <section className="py-16 bg-background/50 relative">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              Achievement Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn recognition across multiple categories for your contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="glass-card p-6 border border-border/50 text-center">
                <div className={`w-14 h-14 rounded-xl gradient-cta flex items-center justify-center mx-auto mb-4 ${achievement.color}`}>
                  <achievement.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-heading font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="text-2xl font-bold text-primary">{achievement.count}</div>
                <div className="text-xs text-muted-foreground">active holders</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              Recent Discoveries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Latest verified pattern identifications from our community
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentDiscoveries.map((discovery, index) => (
              <Card key={index} className="glass-card p-6 border border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                      {discovery.user[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{discovery.user}</div>
                      <div className="text-sm text-muted-foreground">identified: {discovery.pattern}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{discovery.location}</div>
                      <div className="flex items-center gap-2 justify-end mt-1">
                        {discovery.verified && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                            ✓ Verified
                          </span>
                        )}
                        <span className="text-sm font-bold text-primary">+{discovery.points} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
