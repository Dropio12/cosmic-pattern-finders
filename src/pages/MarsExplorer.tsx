import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '@/components/map/CoordinatesPanel'
import BoundingBoxes from '@/components/map/FeatureBoundingBox'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MarsTutorial, TutorialButton } from '@/components/MarsTutorial'
import FeatureMarkers from '@/components/map/FeatureMarkers'

const MarsExplorer = () => {
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(false);

  return (
    <div className="w-full h-screen relative">
      {/* Top Left Controls */}
      <div className="fixed top-6 left-6 z-[1000] flex gap-3">
        <Button
          onClick={() => navigate('/explore')}
          variant="secondary"
          size="lg"
          className="glass-card shadow-xl hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        
        <Button
          onClick={() => setRunTutorial(true)}
          variant="outline"
          size="lg"
          className="glass-card shadow-xl hover:scale-105 transition-transform"
        >
          <span className="text-lg">?</span>
        </Button>
      </div>

      <MarsTutorial run={runTutorial} onFinish={() => setRunTutorial(false)} />

      <div id="mars-map" className="w-full h-full">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[0, 0]}
          zoom={2}
          crs={CRS.EPSG4326}
          bounds={[[-90, -180], [90, 180]]}
          minZoom={1}
          maxZoom={7}
          worldCopyJump={true}
        >
          <TileLayer
            url="https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg"
            attribution="NASA/JPL/GSFC"
            tileSize={256}
            noWrap={true}
          />

          <BoundingBoxes />
          <CoordinatesPanel />

          <FeatureMarkers />
        </MapContainer>
      </div>
    </div>
  );
};

export default MarsExplorer;
