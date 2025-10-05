import Papa from 'papaparse';
import { CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HelpCircle } from 'lucide-react'

type FeatureRow = {
  lat: number;
  lon: number;
  feature?: string;
  radius?: number;
  diameter?: number;
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
    const obj: Record<string, any> = {};
    Object.entries(rawRow).forEach(([k, v]) => {
      const key = String(k).trim().toLowerCase();
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

export default function FeatureMarkers() {
  // visibility state for markers control
  const [visible, setVisible] = useState(false);

  // feature rows
  const [features, setFeatures] = useState<FeatureRow[]>([]);
  const [loading, setLoading] = useState(false);

  // new/modified state for UI behavior (add these near other state declarations)
  const [addingMarker, setAddingMarker] = useState(false)
  const [markerStart, setMarkerStart] = useState<any | null>(null)

  // optional cancel helper (call where appropriate)
  const cancelAdding = () => {
    setMarkerStart(null)
    setAddingMarker(false)
  }

  // Load CSV lazily when user enables markers
  useEffect(() => {
    let mounted = true;
    if (!visible) return;
    // if already loaded, don't fetch again
    if (features.length > 0) return;

    setLoading(true);
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
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [visible, features.length]);

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 1000, right: 10, top: 60 }}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="glass-card shadow-lg w-10 h-10 p-0"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Map Options</h4>
              <Button
                onClick={() => setVisible(v => !v)}
                variant={visible ? 'secondary' : 'default'}
                size="sm"
                className="w-full"
              >
                {visible ? 'Hide Features from IAU' : 'Show Features from IAU'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {visible && loading && (
        <div style={{ position: 'absolute', zIndex: 1000, right: 10, top: 100, background: 'rgba(255,255,255,0.9)', padding: 6, borderRadius: 4 }}>
          Loading markers...
        </div>
      )}

      {visible && features.map((f, idx) => {
        const color = f.color ?? getColorForFeature(f.feature);
        return (
          <CircleMarker
            key={idx}
            center={[f.lat, f.lon]}
            radius={6}
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
    </>
  );
}