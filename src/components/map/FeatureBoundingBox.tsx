import './FeatureBoundingBox.css'
import { useState, useEffect } from 'react'
import { Marker, Rectangle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'

type LatLng = { lat: number; lng: number }
type Box = { id: number; bounds: [[number, number], [number, number]]; label: string; user_id: string | null }

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function makeBounds(a: LatLng, b: LatLng): [[number, number], [number, number]] {
  const south = Math.min(a.lat, b.lat)
  const north = Math.max(a.lat, b.lat)
  const west = Math.min(a.lng, b.lng)
  const east = Math.max(a.lng, b.lng)
  return [[south, west], [north, east]]
}

function centerOfBounds(bounds: [[number, number], [number, number]]): [number, number] {
  const lat = (bounds[0][0] + bounds[1][0]) / 2
  const lng = (bounds[0][1] + bounds[1][1]) / 2
  return [lat, lng]
}

function MapEventsHandler({
  enabled,
  start,
  onMapClick,
  onMouseMove,
}: {
  enabled: boolean
  start: LatLng | null
  onMapClick: (p: LatLng) => void
  onMouseMove: (p: LatLng | null) => void
}) {
  useMapEvents({
    click(e) {
      if (enabled) onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    mousemove(e) {
      // update preview only while drawing and after the first click
      if (enabled && start) {
        onMouseMove({ lat: e.latlng.lat, lng: e.latlng.lng })
      } else {
        onMouseMove(null)
      }
    },
    // clear preview if mouse leaves the map
    mouseout() {
      onMouseMove(null)
    },
  })
  return null
}

export default function BoundingBoxes() {
  const [drawing, setDrawing] = useState(false)
  const [start, setStart] = useState<LatLng | null>(null)
  const [mousePos, setMousePos] = useState<LatLng | null>(null)
  const [boxes, setBoxes] = useState<Box[]>([])
  const { user } = useAuth()

  // Load zones from database on mount
  useEffect(() => {
    const loadZones = async () => {
      const { data, error } = await supabase
        .from('labels')
        .select('*');

      if (error) {
        console.error('Error loading zones:', error);
        return;
      }

      if (data) {
        const loadedBoxes = data
          .filter(zone => {
            const pos = zone.position as any;
            return pos && pos.corner1 && pos.corner2;
          })
          .map(zone => {
            const pos = zone.position as any;
            const bounds: [[number, number], [number, number]] = [
              [pos.corner1.lat, pos.corner1.lng],
              [pos.corner2.lat, pos.corner2.lng]
            ];
            return {
              id: zone.id,
              bounds,
              label: zone.name,
              user_id: zone.user_id,
            };
          });
        setBoxes(loadedBoxes);
      }
    };

    loadZones();
  }, []);

  const saveZoneToDb = async (bounds: [[number, number], [number, number]], label: string) => {
    const corner1 = { lat: bounds[0][0], lng: bounds[0][1] };
    const corner2 = { lat: bounds[1][0], lng: bounds[1][1] };

    const { data, error } = await supabase
      .from('labels')
      .insert({
        name: label,
        user_id: user?.id || null,
        position: { corner1, corner2 },
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving zone:', error);
      return null;
    }
    
    return data;
  };

  const handleMapClick = async (p: LatLng) => {
    if (!start) {
      // first click: set start point
      setStart(p)
    } else {
      // second click: finalize box, prompt for label
      const bounds = makeBounds(start, p)
      const label = window.prompt('Label for bounding box:', '') || ''
      
      // Save to database first to get the real ID
      const savedZone = await saveZoneToDb(bounds, label);
      
      if (savedZone) {
        const box: Box = { 
          id: savedZone.id, 
          bounds, 
          label, 
          user_id: savedZone.user_id 
        }
        setBoxes((s) => [...s, box])
      }
      
      setStart(null)
      setMousePos(null)
      setDrawing(false)
    }
  }

  const handleZoneClick = async (box: Box) => {
    if (!drawing && box.user_id === user?.id) {
      const confirmed = window.confirm(`Delete zone "${box.label}"?`);
      if (confirmed) {
        // Delete from database
        const { error } = await supabase
          .from('labels')
          .delete()
          .eq('id', box.id);
        
        if (error) {
          console.error('Error deleting zone:', error);
        } else {
          // Remove from local state
          setBoxes(boxes.filter(b => b.id !== box.id));
        }
      }
    }
  }

  const cancelDrawing = () => {
    setStart(null)
    setMousePos(null)
    setDrawing(false)
  }

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 1000, right: 10, top: 10 }}>
        <button
          onClick={() => {
            setDrawing((d) => !d)
            setStart(null)
            setMousePos(null)
          }}
          style={{ marginRight: 8 }}
        >
          {drawing ? 'Cancel Label' : 'Add Label'}
        </button>
        {drawing && <button onClick={cancelDrawing}>Abort</button>}
      </div>

      {/* map events: click + mousemove for preview */}
      <MapEventsHandler enabled={drawing} start={start} onMapClick={handleMapClick} onMouseMove={setMousePos} />

      {/* show an interim marker for first click */}
      {start && <Marker position={[start.lat, start.lng]} />}

      {/* preview rectangle while moving mouse after first click */}
      {start && mousePos && (
        <Rectangle bounds={makeBounds(start, mousePos)} pathOptions={{ color: 'blue', dashArray: '6' }} />
      )}

      {/* render saved boxes */}
      {boxes.map((b) => {
        const center = centerOfBounds(b.bounds)
        const canDelete = b.user_id === user?.id
        // divIcon for label (styled via CSS). sanitize label.
        const safeLabel = escapeHtml(b.label || '')
        const icon = L.divIcon({
          className: 'custom-bbox-icon', // container class
          html: `<div class="bbox-label ${canDelete ? 'deletable' : ''}">${safeLabel}</div>`,
          iconSize: undefined,
          iconAnchor: [0, 0],
        })
        return (
          <div key={b.id}>
            <Rectangle 
              bounds={b.bounds} 
              pathOptions={{ color: 'red' }}
              eventHandlers={{
                click: () => handleZoneClick(b)
              }}
            />
            <Marker
              position={center}
              icon={icon}
              interactive={canDelete}
              keyboard={false}
              zIndexOffset={1000}
              eventHandlers={canDelete ? {
                click: () => handleZoneClick(b)
              } : undefined}
            />
          </div>
        )
      })}
    </>
  )
}