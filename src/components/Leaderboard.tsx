import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, CheckCircle, Zap, Tag } from "lucide-react";

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
    <section id="leaderboard" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Your Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of planetary explorers making real scientific contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-heading font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors.map((contributor) => (
                <div
                  key={contributor.rank}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {contributor.rank}
                    </div>
                    <div className="text-2xl">{contributor.avatar}</div>
                    <span className="font-medium">{contributor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="font-bold">{contributor.points.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🏆 Pattern Master
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🔬 Scientific Contributor
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🌟 Explorer Elite
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🚀 Space Pioneer
          </Badge>
        </div>
      </div>
    </section>
  );
};
