import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Trash2, Menu, Info } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { CoordinatesPanel } from "./CoordinatesPanel";

type PatternTag = {
  id: number;
  lat: number;
  lng: number;
  type: string;
  notes: string;
};

type MarsLeafletMapProps = {
  patternOptions: { value: string; label: string }[];
};

// Custom marker icon
const createMarkerIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"><path fill="${color}" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.4 12.5 28.5 12.5 28.5S25 20.9 25 12.5C25 5.6 19.4 0 12.5 0z"/><circle cx="12.5" cy="12.5" r="7.5" fill="white"/></svg>`)}`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const markerIcon = createMarkerIcon("#ef4444");

function MapClickHandler({ 
  onMapClick
}: { 
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const MarsLeafletMap = ({ patternOptions }: MarsLeafletMapProps) => {
  const [tags, setTags] = useState<PatternTag[]>([]);
  const [patternType, setPatternType] = useState<string>(patternOptions[0]?.value || "crater");
  const [notes, setNotes] = useState("");
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Load saved patterns from database
  useEffect(() => {
    const loadSavedPatterns = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('labels')
        .select('*')
        .eq('user_id', user.id)
        .eq('name', 'mars'); // Use name field to identify explorer type

      if (error) {
        console.error('Error loading patterns:', error);
        return;
      }

      if (data) {
        const loadedTags = data.map(label => {
          const position = label.position as { lat: number; lng: number; type: string; notes?: string };
          return {
            id: label.id,
            lat: position.lat,
            lng: position.lng,
            type: position.type,
            notes: position.notes || '',
          };
        });
        setTags(loadedTags);
      }
    };

    loadSavedPatterns();
  }, [user]);

  // Handle pending patterns after login
  useEffect(() => {
    const savePendingPatterns = async () => {
      if (!user) return;

      const pendingPatterns = localStorage.getItem('pendingMarsPatterns');
      if (pendingPatterns) {
        try {
          const patterns = JSON.parse(pendingPatterns);
          await savePatterns(patterns, true);
          localStorage.removeItem('pendingMarsPatterns');
          toast({
            title: "Patterns saved!",
            description: "Your discoveries have been saved to your account.",
          });
        } catch (error) {
          console.error('Error saving pending patterns:', error);
        }
      }
    };

    savePendingPatterns();
  }, [user]);

  const handleMapClick = (lat: number, lng: number) => {
    const newTag: PatternTag = {
      id: Date.now(),
      lat,
      lng,
      type: patternType,
      notes,
    };
    setTags([...tags, newTag]);
    setNotes("");
    
    toast({
      title: "Pattern tagged!",
      description: `Added ${patternType} at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
    });
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
    toast({
      title: "Pattern deleted",
      description: "Tag has been removed from the map.",
    });
  };

  const savePatterns = async (patternsToSave: PatternTag[] = tags, skipToast = false) => {
    if (!user) {
      localStorage.setItem('pendingMarsPatterns', JSON.stringify(patternsToSave));
      toast({
        title: "Sign in required",
        description: "Please sign in to save your discoveries.",
      });
      navigate('/auth', { state: { from: location.pathname } });
      return;
    }

    setIsSaving(true);

    try {
      // Delete existing patterns for Mars
      await supabase
        .from('labels')
        .delete()
        .eq('user_id', user.id)
        .eq('name', 'mars');

      // Insert new patterns
      const labelsData = patternsToSave.map(tag => ({
        user_id: user.id,
        name: 'mars',
        position: {
          lat: tag.lat,
          lng: tag.lng,
          type: tag.type,
          notes: tag.notes,
        },
      }));

      const { error } = await supabase
        .from('labels')
        .insert(labelsData);

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

  const exportToCSV = () => {
    if (tags.length === 0) {
      toast({
        title: "No data to export",
        description: "Please tag some patterns first.",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Pattern Type', 'Latitude', 'Longitude', 'Notes'];
    const rows = tags.map(tag => [
      tag.type,
      tag.lat.toFixed(6),
      tag.lng.toFixed(6),
      tag.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `mars-patterns-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful!",
      description: `Exported ${tags.length} pattern(s) to CSV.`,
    });
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-heading font-semibold mb-4">Pattern Details</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Pattern Type</label>
            <Select value={patternType} onValueChange={setPatternType}>
              <SelectTrigger className="glass-card border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-[10000]">
                {patternOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
            <Input
              placeholder="Add notes about this pattern..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="glass-card border-border/50"
            />
          </div>
        </div>
      </div>

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
                      {tag.lat.toFixed(2)}°, {tag.lng.toFixed(2)}°
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag.id)}
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

      <div className="p-6 border-t border-border/50 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Tagged:</span>
          <span className="text-foreground font-semibold">{tags.length}</span>
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
          variant="outline"
          size="sm"
          className="w-full"
          onClick={exportToCSV}
          disabled={tags.length === 0}
        >
          <Save className="w-4 h-4 mr-2" />
          Export CSV
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
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="glass-card border-b border-border/50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 flex-wrap z-[1000]">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-2xl font-heading font-bold">Mars Pattern Explorer</h1>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 hidden sm:flex">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2"></div>
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {/* Mobile Pattern Selector */}
          <Select value={patternType} onValueChange={setPatternType}>
            <SelectTrigger className="w-[140px] md:w-[180px] glass-card border-border/50 text-xs md:text-sm md:hidden">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-[10000]">
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
            <SheetContent side="right" className="w-80 p-0 glass-card border-border/50 flex flex-col z-[10000]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            minZoom={1}
            maxZoom={8}
            className="h-full w-full"
            worldCopyJump={false}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
              attribution='NASA/JPL/GSFC'
              noWrap={true}
              bounds={[[-90, -180], [90, 180]]}
            />
            <MapClickHandler 
              onMapClick={handleMapClick}
            />
            <CoordinatesPanel />
            {tags.map((tag) => (
              <Marker
                key={tag.id}
                position={[tag.lat, tag.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold capitalize">{tag.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {tag.lat.toFixed(4)}°, {tag.lng.toFixed(4)}°
                    </div>
                    {tag.notes && <div className="text-xs mt-1">{tag.notes}</div>}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => removeTag(tag.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-80 glass-card border-l border-border/50 flex-col">
          <SidebarContent />
        </div>
      </div>
    </div>
  );
};
