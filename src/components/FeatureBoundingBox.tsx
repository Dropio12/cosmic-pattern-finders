import './FeatureBoundingBox.css'
import { useState, useEffect } from 'react'
import { Marker, Rectangle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Tag, X } from 'lucide-react'

type LatLng = { lat: number; lng: number }
type Box = { id: number; bounds: [[number, number], [number, number]]; label: string; user_id: string | null; verified: boolean }

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
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user has admin role (using secure user_roles table)
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!!data);
    };

    checkAdmin();
  }, [user]);

  // Load zones from database on mount
  useEffect(() => {
    const loadZones = async () => {
      // Clear previous data to avoid stale display when auth status changes
      setBoxes([]);

      let query = supabase.from('labels').select('*');

      if (isAdmin) {
        // Admins see ALL zones (no filter needed)
      } else if (user) {
        // Logged-in users see: verified zones OR their own non-verified zones
        query = query.or(`verified.eq.true,user_id.eq.${user.id}`);
      } else {
        // Anonymous users see only verified zones
        query = query.eq('verified', true);
      }

      const { data, error } = await query;

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
              verified: zone.verified,
            };
          });
        setBoxes(loadedBoxes);
      }
    };

    loadZones();
  }, [user, isAdmin]);

  const saveZoneToDb = async (bounds: [[number, number], [number, number]], label: string) => {
    const corner1 = { lat: bounds[0][0], lng: bounds[0][1] };
    const corner2 = { lat: bounds[1][0], lng: bounds[1][1] };

    const { data, error } = await supabase
      .from('labels')
      .insert({
        name: label,
        user_id: user?.id || null,
        position: { corner1, corner2 },
        verified: isAdmin, // Admins' zones are automatically verified
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
      const labelInput = window.prompt('Label for bounding box (max 100 characters):', '') || '';
      
      // Validate label input
      const label = labelInput.trim().slice(0, 100);
      if (!label) {
        console.error('Label cannot be empty');
        setDrawing(false);
        setStart(null);
        return;
      }
      
      // Save to database first to get the real ID
      const savedZone = await saveZoneToDb(bounds, label);
      
      if (savedZone) {
        const box: Box = { 
          id: savedZone.id, 
          bounds, 
          label, 
          user_id: savedZone.user_id,
          verified: savedZone.verified
        }
        setBoxes((s) => [...s, box])
      }
      
      setStart(null)
      setMousePos(null)
      setDrawing(false)
    }
  }

  const handleZoneClick = async (box: Box) => {
    if (drawing) return;

    // Admins can verify unverified zones
    if (isAdmin && !box.verified) {
      const confirmed = window.confirm(`Verify zone "${box.label}"?`);
      if (confirmed) {
        const { error } = await supabase
          .from('labels')
          .update({ verified: true })
          .eq('id', box.id);
        
        if (error) {
          console.error('Error verifying zone:', error);
        } else {
          // Add 25 points to the user who created the zone
          if (box.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('points')
              .eq('id', box.user_id)
              .single();
            
            if (profile) {
              await supabase
                .from('profiles')
                .update({ points: profile.points + 25 })
                .eq('id', box.user_id);
            }
          }
          
          // Update local state
          setBoxes(boxes.map(b => b.id === box.id ? { ...b, verified: true } : b));
        }
      }
    }
    // Users can delete their own zones
    else if (box.user_id === user?.id) {
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
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <Button
          onClick={() => {
            setDrawing((d) => !d)
            setStart(null)
            setMousePos(null)
          }}
          variant={drawing ? "secondary" : "default"}
          size="sm"
          className="glass-card shadow-lg"
        >
          {drawing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Tag className="w-4 h-4 mr-2" />
              Add Label
            </>
          )}
        </Button>
        {drawing && start && (
          <Button
            onClick={cancelDrawing}
            variant="destructive"
            size="sm"
            className="shadow-lg"
          >
            <X className="w-4 h-4 mr-2" />
            Abort
          </Button>
        )}
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