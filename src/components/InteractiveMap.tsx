import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Circle, Square, Pentagon, MapPin, Layers, Save, Trash2, Info } from "lucide-react";
import { useState } from "react";
import marsMap from "@/assets/mars-map.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type PatternTag = {
  x: number;
  y: number;
  id: number;
  type: string;
  notes: string;
};

export const InteractiveMap = () => {
  const [zoom, setZoom] = useState(1);
  const [tags, setTags] = useState<PatternTag[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>("pin");
  const [patternType, setPatternType] = useState<string>("crater");
  const [showLayers, setShowLayers] = useState(true);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState("");

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTags([...tags, { x, y, id: Date.now(), type: patternType, notes }]);
    setNotes("");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
    setMouseCoords({ x, y });
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <section className="fixed inset-0 top-20 bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="glass-card border-b border-border/50 px-6 py-4 flex items-center justify-between gap-4 flex-wrap z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-bold">Pattern Explorer</h1>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2"></div>
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg border border-border/50">
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[50px] text-center">
              {(zoom * 100).toFixed(0)}%
            </span>
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(zoom + 0.2, 3))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Drawing Tools */}
          <div className="flex items-center gap-1 glass-card px-2 py-1.5 rounded-lg border border-border/50">
            <Button
              variant={selectedTool === "pin" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("pin")}
            >
              <MapPin className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "circle" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("circle")}
            >
              <Circle className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "square" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("square")}
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "polygon" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("polygon")}
            >
              <Pentagon className="w-4 h-4" />
            </Button>
          </div>

          {/* Pattern Type Selector */}
          <Select value={patternType} onValueChange={setPatternType}>
            <SelectTrigger className="w-[180px] glass-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crater">Impact Crater</SelectItem>
              <SelectItem value="geological">Geological Layer</SelectItem>
              <SelectItem value="aeolian">Aeolian Feature</SelectItem>
              <SelectItem value="fluvial">Fluvial Channel</SelectItem>
              <SelectItem value="volcanic">Volcanic Structure</SelectItem>
              <SelectItem value="tectonic">Tectonic Pattern</SelectItem>
            </SelectContent>
          </Select>

          {/* Layer Toggle */}
          <Button
            variant={showLayers ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
          >
            <Layers className="w-4 h-4 mr-2" />
            Layers
          </Button>

          {/* Actions */}
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative overflow-auto bg-black">
          <div
            className="relative min-h-full cursor-crosshair"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s ease'
            }}
            onClick={handleMapClick}
            onMouseMove={handleMouseMove}
          >
            <img
              src={marsMap}
              alt="Interactive planetary surface map for pattern recognition"
              className="w-full h-auto"
            />
            
            {/* Tags */}
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
              >
                <div className="w-full h-full rounded-full bg-primary/30 animate-ping"></div>
                <div className="absolute inset-0 w-full h-full rounded-full border-2 border-primary bg-primary/50"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="glass-card px-3 py-2 rounded-lg border border-border/50 text-xs whitespace-nowrap">
                    <div className="font-semibold text-foreground capitalize">{tag.type}</div>
                    {tag.notes && <div className="text-muted-foreground">{tag.notes}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 glass-card border-l border-border/50 flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-heading font-semibold mb-4">Pattern Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
                <Input
                  placeholder="Add notes about this pattern..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="glass-card border-border/50"
                />
              </div>
              <div className="glass-card p-3 rounded-lg border border-border/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="text-foreground font-mono">{mouseCoords.x}, {mouseCoords.y}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Zoom:</span>
                  <span className="text-foreground">{(zoom * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagged Patterns List */}
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold">Tagged Patterns</h3>
              <Badge variant="outline">{tags.length}</Badge>
            </div>
            
            {tags.length === 0 ? (
              <div className="text-center py-8">
                <Info className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Click on the map to start tagging patterns
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tags.map((tag, index) => (
                  <div key={tag.id} className="glass-card p-4 rounded-lg border border-border/50 group">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm capitalize text-foreground">{tag.type}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          {tag.x.toFixed(1)}, {tag.y.toFixed(1)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(tag.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    {tag.notes && (
                      <p className="text-xs text-muted-foreground mt-2">{tag.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Stats */}
          <div className="p-6 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Tagged:</span>
              <span className="text-foreground font-semibold">{tags.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">AI Verified:</span>
              <span className="text-success font-semibold">{Math.floor(tags.length * 0.82)}</span>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => setTags([])}
              disabled={tags.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Tags
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
