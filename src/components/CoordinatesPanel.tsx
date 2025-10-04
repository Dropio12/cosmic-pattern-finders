import { useState, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { Badge } from "@/components/ui/badge";

export const CoordinatesPanel = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const map = useMapEvents({
    move: () => {
      const c = map.getCenter();
      setCoords({ lat: c.lat, lng: c.lng });
    },
    click: (e) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    zoomend: () => {
      const c = map.getCenter();
      setCoords({ lat: c.lat, lng: c.lng });
    },
  });

  useEffect(() => {
    const c = map.getCenter();
    setCoords({ lat: c.lat, lng: c.lng });
  }, [map]);

  if (!coords) return null;

  return (
    <div className="absolute bottom-4 left-4 glass-card p-3 rounded-lg border border-border/50 shadow-lg z-[900]">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground min-w-[50px]">Latitude:</span>
          <Badge variant="outline" className="font-mono text-xs">
            {coords.lat.toFixed(6)}°
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground min-w-[50px]">Longitude:</span>
          <Badge variant="outline" className="font-mono text-xs">
            {coords.lng.toFixed(6)}°
          </Badge>
        </div>
      </div>
    </div>
  );
};
