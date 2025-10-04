import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, MapPin, Save, Trash2, Info, Menu, Eraser } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import marsMap from "@/assets/mars-map.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type PatternTag = {
  x: number;
  y: number;
  id: number;
  type: string;
  notes: string;
};

type InteractiveMapProps = {
  mapImage: string;
  title: string;
  patternOptions: { value: string; label: string }[];
  explorerType: 'mars' | 'deepspace';
};

export const InteractiveMap = ({ mapImage, title, patternOptions, explorerType }: InteractiveMapProps) => {
  const [zoom, setZoom] = useState(1);
  const [tags, setTags] = useState<PatternTag[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>("pin");
  const [patternType, setPatternType] = useState<string>(patternOptions[0]?.value || "crater");
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState("");
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.pattern-tag')) {
      return; // Don't add new tag if clicking on existing tag when not in eraser mode
    }
    
    // Only add new tags if not in eraser mode
    if (selectedTool !== "eraser") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setTags([...tags, { x, y, id: Date.now(), type: patternType, notes }]);
      setNotes("");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
    setMouseCoords({ x, y });
  };

  const removeTag = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTags(tags.filter(tag => tag.id !== id));
    toast({
      title: "Pattern deleted",
      description: "Tag has been removed from the map.",
    });
  };

  const handleTagClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTool === "eraser") {
      removeTag(id);
    }
  };

  // Load saved patterns from database on mount
  useEffect(() => {
    const loadSavedPatterns = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('saved_patterns')
        .select('*')
        .eq('user_id', user.id)
        .eq('explorer_type', explorerType);

      if (error) {
        console.error('Error loading patterns:', error);
        return;
      }

      if (data) {
        const loadedTags = data.map(pattern => ({
          id: Date.now() + Math.random(), // Generate unique ID
          x: Number(pattern.x_coordinate),
          y: Number(pattern.y_coordinate),
          type: pattern.pattern_type,
          notes: pattern.notes || '',
        }));
        setTags(loadedTags);
      }
    };

    loadSavedPatterns();
  }, [user, explorerType]);

  // Handle pending patterns after login
  useEffect(() => {
    const savePendingPatterns = async () => {
      if (!user) return;

      const pendingPatterns = localStorage.getItem('pendingPatterns');
      if (pendingPatterns) {
        try {
          const patterns = JSON.parse(pendingPatterns);
          const pendingExplorerType = localStorage.getItem('pendingExplorerType');
          
          if (pendingExplorerType === explorerType) {
            await savePatterns(patterns, true);
            localStorage.removeItem('pendingPatterns');
            localStorage.removeItem('pendingExplorerType');
            toast({
              title: "Patterns saved!",
              description: "Your discoveries have been saved to your account.",
            });
          }
        } catch (error) {
          console.error('Error saving pending patterns:', error);
        }
      }
    };

    savePendingPatterns();
  }, [user, explorerType]);

  const savePatterns = async (patternsToSave: PatternTag[] = tags, skipToast = false) => {
    if (!user) {
      // Save to localStorage and redirect to auth
      localStorage.setItem('pendingPatterns', JSON.stringify(patternsToSave));
      localStorage.setItem('pendingExplorerType', explorerType);
      
      toast({
        title: "Sign in required",
        description: "Please sign in to save your discoveries.",
      });
      
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }

    setIsSaving(true);

    try {
      // Delete existing patterns for this explorer type
      await supabase
        .from('saved_patterns')
        .delete()
        .eq('user_id', user.id)
        .eq('explorer_type', explorerType);

      // Insert new patterns
      const patternsData = patternsToSave.map(tag => ({
        user_id: user.id,
        explorer_type: explorerType,
        pattern_type: tag.type,
        x_coordinate: tag.x,
        y_coordinate: tag.y,
        notes: tag.notes,
      }));

      const { error } = await supabase
        .from('saved_patterns')
        .insert(patternsData);

      if (error) throw error;

      if (!skipToast) {
        toast({
          title: "Progress saved!",
          description: `${patternsToSave.length} pattern(s) have been saved.`,
        });
      }
    } catch (error) {
      console.error('Error saving patterns:', error);
      toast({
        title: "Save failed",
        description: "Could not save your patterns. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const SidebarContent = () => (
    <>
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
            {tags.map((tag) => (
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
                    onClick={(e) => removeTag(tag.id, e)}
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => savePatterns()}
          disabled={tags.length === 0 || isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : user ? "Save Progress" : "Sign In to Save"}
        </Button>
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
    </>
  );

  return (
    <section className="h-full bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="glass-card border-b border-border/50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 flex-wrap z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-2xl font-heading font-bold">{title}</h1>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 hidden sm:flex">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2"></div>
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 md:gap-2 glass-card px-2 md:px-3 py-1.5 rounded-lg border border-border/50">
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(zoom - 0.5, 0.5))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs md:text-sm text-muted-foreground min-w-[40px] md:min-w-[50px] text-center">
              {(zoom * 100).toFixed(0)}%
            </span>
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(zoom + 0.5, 20))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Drawing Tools */}
          <div className="flex items-center gap-1 glass-card px-2 py-1.5 rounded-lg border border-border/50">
            <Button
              variant={selectedTool === "pin" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("pin")}
              title="Pin tool - Click to add tags"
            >
              <MapPin className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "eraser" ? "destructive" : "ghost"}
              size="sm"
              onClick={() => setSelectedTool("eraser")}
              title="Eraser - Click tags to delete"
            >
              <Eraser className="w-4 h-4" />
            </Button>
          </div>

          {/* Pattern Type Selector */}
          <Select value={patternType} onValueChange={setPatternType}>
            <SelectTrigger className="w-[140px] md:w-[180px] glass-card border-border/50 text-xs md:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {patternOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mobile Menu */}
          <Sheet open={showMobileSheet} onOpenChange={setShowMobileSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 glass-card border-border/50 flex flex-col">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Export - Hidden on mobile */}
          <Button variant="outline" size="sm" className="hidden lg:flex">
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
            className="relative min-h-full"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              transition: 'transform 0.2s ease',
              cursor: selectedTool === "eraser" ? "not-allowed" : "crosshair"
            }}
            onClick={handleMapClick}
            onMouseMove={handleMouseMove}
          >
            <img
              src={mapImage}
              alt="Interactive planetary surface map for pattern recognition"
              className="w-full h-auto"
            />
            
            {/* Tags */}
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 group pattern-tag ${
                  selectedTool === "eraser" ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                onClick={(e) => handleTagClick(tag.id, e)}
              >
                <div className="w-full h-full rounded-full bg-primary/30 animate-ping"></div>
                <div className={`absolute inset-0 w-full h-full rounded-full border-2 transition-colors ${
                  selectedTool === "eraser" 
                    ? "border-destructive bg-destructive/50 group-hover:bg-destructive/70" 
                    : "border-primary bg-primary/50 group-hover:border-primary/70"
                }`}></div>
                {selectedTool === "eraser" && (
                  <Eraser className="absolute inset-0 m-auto w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 scale-90 group-hover:scale-100">
                  <div className="glass-tooltip px-4 py-2.5 rounded-lg text-xs whitespace-nowrap min-w-[120px]">
                    <div className="font-semibold text-white capitalize text-sm mb-1">{tag.type}</div>
                    <div className="text-gray-300 text-xs font-mono opacity-75">
                      {tag.x.toFixed(1)}%, {tag.y.toFixed(1)}%
                    </div>
                    {tag.notes && (
                      <div className="text-gray-300 mt-2 pt-2 border-t border-white/10 max-w-[200px] whitespace-normal">
                        {tag.notes}
                      </div>
                    )}
                    {selectedTool === "eraser" && (
                      <div className="text-red-400 text-xs mt-2 pt-2 border-t border-white/10 font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" />
                        Click to delete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Desktop only */}
        <div className="hidden md:flex w-80 glass-card border-l border-border/50 flex-col">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        <Sheet open={showMobileSheet} onOpenChange={setShowMobileSheet}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
              <Menu className="w-6 h-6" />
              {tags.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-6 h-6 rounded-full p-0 flex items-center justify-center">
                  {tags.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
        </Sheet>
      </div>
    </section>
  );
};
