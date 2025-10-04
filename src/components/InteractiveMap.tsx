import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <section id="explore" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Interactive Map Viewer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click anywhere on the map to tag interesting patterns and features
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-4 bg-card">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 0.1, 2))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  Zoom: {(zoom * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="relative overflow-hidden rounded-lg border-2 border-border bg-black">
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
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Tags placed: {tags.length}</span>
              <Button variant="ghost" size="sm" onClick={() => setTags([])}>
                Clear Tags
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
