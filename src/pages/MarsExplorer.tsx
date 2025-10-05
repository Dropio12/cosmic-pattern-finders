import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '../components/CoordinatesPanel'
import BoundingBoxes from '../components/FeatureBoundingBox'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MarsTutorial, TutorialButton } from '@/components/MarsTutorial'



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
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(false);

  return (
    <div className="w-full h-screen relative">
      {/* Back Button */}
      <Button
        onClick={() => navigate('/explore')}
        variant="secondary"
        size="sm"
        className="absolute top-4 left-4 z-[1000] glass-card shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explore
      </Button>

      <TutorialButton onClick={() => setRunTutorial(true)} />
      <MarsTutorial run={runTutorial} onFinish={() => setRunTutorial(false)} />

      <div id="mars-map" className="w-full h-full">
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
