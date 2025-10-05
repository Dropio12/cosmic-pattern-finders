import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '@/components/map/CoordinatesPanel'
import BoundingBoxes from '@/components/map/FeatureBoundingBox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Mountain, Layers, Flame, Circle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MarsTutorial, TutorialButton } from '@/components/MarsTutorial'
import FeatureMarkers from '@/components/map/FeatureMarkers'

const featureTypes = [
  { value: "Impact Crater", label: "Impact Crater", icon: Circle, color: "text-red-400" },
  { value: "Tectonic Pattern", label: "Tectonic Pattern", icon: Layers, color: "text-blue-400" },
  { value: "Volcanic Structure", label: "Volcanic Structure", icon: Flame, color: "text-orange-400" },
  { value: "Layered Deposit", label: "Layered Deposit", icon: Mountain, color: "text-purple-400" },
];

const MarsExplorer = () => {
  const navigate = useNavigate();
  const [runTutorial, setRunTutorial] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <div className="w-full h-screen relative">
      {/* Back Button */}
      <Button
        onClick={() => navigate('/explore')}
        variant="secondary"
        size="sm"
        className="fixed bottom-6 left-6 z-[1000] glass-card shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explore
      </Button>

      <TutorialButton onClick={() => setRunTutorial(true)} />
      <MarsTutorial run={runTutorial} onFinish={() => setRunTutorial(false)} />

      {/* Feature Selection Panel */}
      <Card id="feature-selector" className="fixed top-6 left-6 z-[1000] glass-card shadow-2xl p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-3 text-foreground">Select Feature Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {featureTypes.map((feature) => {
            const Icon = feature.icon;
            const isSelected = selectedFeature === feature.value;
            return (
              <Button
                key={feature.value}
                onClick={() => setSelectedFeature(isSelected ? null : feature.value)}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-auto py-3 flex flex-col items-center gap-2 transition-all ${
                  isSelected ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-foreground' : feature.color}`} />
                <span className="text-xs text-center leading-tight">{feature.label}</span>
              </Button>
            );
          })}
        </div>
        {selectedFeature && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Click "Add Feature" to start labeling
          </p>
        )}
      </Card>

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

          <BoundingBoxes selectedFeature={selectedFeature} />
          <CoordinatesPanel />

          <FeatureMarkers />
        </MapContainer>
      </div>
    </div>
  );
};

export default MarsExplorer;
