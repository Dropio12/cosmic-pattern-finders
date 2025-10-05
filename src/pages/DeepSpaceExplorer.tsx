import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer } from 'react-leaflet';
import BoundingBoxes from '@/components/map/FeatureBoundingBoxSpace'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const deepspacePatterns = [
  { value: "galaxy", label: "Galaxy" },
  { value: "spiral-galaxy", label: "Spiral Galaxy" },
  { value: "elliptical-galaxy", label: "Elliptical Galaxy" },
  { value: "irregular-galaxy", label: "Irregular Galaxy" },
  { value: "galaxy-cluster", label: "Galaxy Cluster" },
  { value: "galaxy-collision", label: "Galaxy Collision/Merger" },
  { value: "nebula", label: "Nebula" },
  { value: "emission-nebula", label: "Emission Nebula" },
  { value: "reflection-nebula", label: "Reflection Nebula" },
  { value: "planetary-nebula", label: "Planetary Nebula" },
  { value: "dark-nebula", label: "Dark Nebula" },
  { value: "star-cluster", label: "Star Cluster" },
  { value: "open-cluster", label: "Open Star Cluster" },
  { value: "globular-cluster", label: "Globular Cluster" },
  { value: "supernova", label: "Supernova Remnant" },
  { value: "nova", label: "Nova" },
  { value: "black-hole", label: "Black Hole Candidate" },
  { value: "pulsar", label: "Pulsar" },
  { value: "quasar", label: "Quasar" },
  { value: "active-galactic-nucleus", label: "Active Galactic Nucleus (AGN)" },
  { value: "gravitational-lens", label: "Gravitational Lensing" },
  { value: "exoplanet", label: "Exoplanet Transit" },
];

const DeepSpaceExplorer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative">
      <Button
        onClick={() => navigate('/explore')}
        variant="secondary"
        size="sm"
        className="fixed bottom-6 left-6 z-[1000] glass-card shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explore
      </Button>

      <div id="mars-map" className="w-full h-full">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[0, 0]}
          zoom={2}
          minZoom={1}
          maxZoom={4}
          // worldCopyJump={true}
        >
          <TileLayer
            url="/deep-space-tiles/{z}/{x}/{y}.png"
            attribution="NASA/JPL/GSFC"
            tileSize={256}
            noWrap={true}
          />

          <BoundingBoxes />
        </MapContainer>
      </div>
    </div>
  );
};

export default DeepSpaceExplorer;
