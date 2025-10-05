import { MapContainer, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '../components/CoordinatesPanel'
import BoundingBoxes from '../components/FeatureBoundingBox'
import { Globe } from 'lucide-react'



const marsPatterns = [
  { value: "crater", label: "Impact Crater" },
  { value: "tectonic", label: "Tectonic Pattern" },
  { value: "graben", label: "Graben/Fault" },
  { value: "wrinkle-ridge", label: "Wrinkle Ridge" },
  { value: "polar-ice", label: "Polar Ice Cap" },
  { value: "layered-deposit", label: "Layered Deposit" },
  { value: "landslide", label: "Landslide/Mass Wasting" },
  { value: "erosion", label: "Erosion Pattern" },
  { value: "gully", label: "Gully Formation" },
  { value: "recurring-slope", label: "Recurring Slope Lineae (RSL)" },
];

const MarsExplorer = () => {
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mars Explorer</h1>
              <p className="text-xs text-muted-foreground">Label geological features on Mars surface</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-[72px]">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[0, 0]}
          zoom={2}
          crs={CRS.EPSG4326}
          bounds={[[-90, -180], [90, 180]]}
          minZoom={1}
          maxZoom={8}
          worldCopyJump={true}
        >
          <TileLayer
            url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
            attribution="NASA/JPL/GSFC"
            tileSize={256}
            noWrap={false}
          />

          <BoundingBoxes />
          <CoordinatesPanel />
        </MapContainer>
      </div>
    </div>
  );
};

export default MarsExplorer;
