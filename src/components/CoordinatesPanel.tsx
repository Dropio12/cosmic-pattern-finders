import { Badge } from "@/components/ui/badge";

type CoordinatesPanelProps = {
  lat: number;
  lng: number;
};

export const CoordinatesPanel = ({ lat, lng }: CoordinatesPanelProps) => {
  return (
    <div className="absolute bottom-4 left-4 glass-card p-3 rounded-lg border border-border/50 shadow-lg z-[900]">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground min-w-[50px]">Latitude:</span>
          <Badge variant="outline" className="font-mono text-xs">
            {lat.toFixed(6)}°
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground min-w-[50px]">Longitude:</span>
          <Badge variant="outline" className="font-mono text-xs">
            {lng.toFixed(6)}°
          </Badge>
        </div>
      </div>
    </div>
  );
};
