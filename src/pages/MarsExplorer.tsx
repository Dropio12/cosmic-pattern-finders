import { MapContainer, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '../components/map/CoordinatesPanel'
import BoundingBoxes from '../components/map/FeatureBoundingBox'
import FeatureMarkers from '../components/map/FeatureMarkers'

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
    <div>
      <MapContainer
        style={{ height: '90vh', width: '100vw' }}
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
  );
};

export default MarsExplorer;
