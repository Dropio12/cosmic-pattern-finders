import Papa from 'papaparse';
import { MapContainer, Marker, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';
import { useEffect, useState } from 'react';
import CoordinatesPanel from '../components/map/CoordinatesPanel'
import BoundingBoxes from '../components/map/FeatureBoundingBox'

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

type FeatureRow = {
  lat: number;
  lon: number;
  feature?: string;
  radius?: number; // optional, interpreted as pixels when small, heuristic when large
  color?: string;
  name?: string;
  [k: string]: any;
};

const getColorForFeature = (feature?: string) => {
  if (!feature) return '#ff7800';
  const f = feature.toLowerCase();
  if (f.includes('crater')) return '#e74c3c';
  if (f.includes('tectonic') || f.includes('graben') || f.includes('fault')) return '#9b59b6';
  if (f.includes('wrinkle')) return '#f1c40f';
  if (f.includes('polar')) return '#3498db';
  if (f.includes('layer')) return '#2ecc71';
  if (f.includes('landslide') || f.includes('erosion')) return '#d35400';
  if (f.includes('gully') || f.includes('rsl')) return '#1abc9c';
  return '#ff7800';
};

const parseCsv = (text: string): FeatureRow[] => {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const data = (parsed.data || []) as any[];
  const rows: FeatureRow[] = [];

  for (const rawRow of data) {
    // normalize keys to lowercase trimmed
    const obj: Record<string, any> = {};
    Object.entries(rawRow).forEach(([k, v]) => {
      const key = String(k).trim().toLowerCase();
      // keep original cell value (papaparse already unquotes)
      obj[key] = typeof v === 'string' ? v.trim() : v;
    });

    let lat = Number(obj['center latitude']);
    let lon = Number(obj['center longitude']);

    if (lon > 180) lon -= 360;

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      console.warn('Skipping row with invalid lat/lon:', lat, lon, obj);
      continue;
    }

    const parsedRow: FeatureRow = {
      lat,
      lon,
      feature: obj['feature type'],
      diameter: Number(obj['diameter']),
      color: getColorForFeature(obj['feature type']),
      name: obj['feature name'],
      ...obj
    };

    rows.push(parsedRow);
  }

  return rows;
};

const computePixelRadius = (r?: number) => {
  if (r === undefined || Number.isNaN(r)) return 6;
  // heuristic: if small (<= 30) assume pixels; if large assume some units -> compress with log
  if (r <= 30) return Math.max(2, Math.floor(r));
  return Math.min(40, Math.max(6, Math.floor(4 + Math.log10(r) * 6)));
};

const MarsExplorer = () => {
  const [features, setFeatures] = useState<FeatureRow[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/marker_features.csv')
      .then(r => {
        if (!r.ok) throw new Error('CSV fetch failed');
        return r.text();
      })
      .then(text => {
        if (!mounted) return;
        const parsed = parseCsv(text);
        setFeatures(parsed);
      })
      .catch(err => {
        console.warn('Could not load marker_features.csv:', err);
      });
    return () => { mounted = false; };
  }, []);

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

        {features.map((f, idx) => {
          const color = f.color ?? getColorForFeature(f.feature);
          const radius = computePixelRadius(f.radius);
          return (
            <CircleMarker
              key={idx}
              center={[f.lat, f.lon]}
              radius={radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.6, weight: 1 }}
            >
              <Popup>
                <div style={{ minWidth: 120 }}>
                  <strong>{f.name ?? `Feature ${idx + 1}`}</strong>
                  <div>Feature type: {f.feature ?? '-'}</div>
                  <div>Lat: {f.lat}, Lon: {f.lon}</div>
                  {f.diameter !== undefined && <div>Diameter: {f.diameter}</div>}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MarsExplorer;
