import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';
import CoordinatesPanel from '../components/CoordinatesPanel'
import BoundingBoxes from '../components/FeatureBoundingBox'



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
    // <div className="fixed inset-0 bg-background">
    //   <InteractiveMap 
    //     mapImage={marsMap}
    //     title="Mars Pattern Explorer"
    //     patternOptions={marsPatterns}
    //     explorerType="mars"
    //   />
    // </div>
    <div>
        <MapContainer
          style={{ height: '90vh', width: '100vw' }}
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
  );
};

export default MarsExplorer;
