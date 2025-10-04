import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Tag, Filter } from "lucide-react";
import { useState } from "react";
import marsMap from "@/assets/mars-map.jpg";

export const InteractiveMap = () => {
  const [zoom, setZoom] = useState(1);
  const [tags, setTags] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTags([...tags, { x, y, id: Date.now() }]);
  };

  return (
    <section id="explore" className="py-32 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(217_91%_60%/0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Interactive Map Viewer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click anywhere on the planetary surface to tag interesting patterns
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-6 rounded-2xl border border-border/50">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 0.1, 2))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2 px-3 py-1 rounded-md bg-muted/50">
                  {(zoom * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  Tag Pattern
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative overflow-hidden rounded-xl border border-border/50 bg-black/50">
              <div
                className="relative cursor-crosshair"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease'
                }}
                onClick={handleMapClick}
              >
                <img
                  src={marsMap}
                  alt="Interactive Mars surface map"
                  className="w-full h-auto"
                />
                
                {/* Tags */}
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                  >
                    <div className="w-full h-full rounded-full bg-accent animate-ping"></div>
                    <div className="absolute inset-0 w-full h-full rounded-full border-2 border-accent bg-accent/50"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Tags placed: <span className="text-foreground font-semibold">{tags.length}</span></span>
                <div className="w-px h-4 bg-border"></div>
                <span className="text-muted-foreground">AI Verified: <span className="text-success font-semibold">{Math.floor(tags.length * 0.8)}</span></span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setTags([])}>
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
