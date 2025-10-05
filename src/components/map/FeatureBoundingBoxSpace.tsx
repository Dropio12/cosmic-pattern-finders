import './FeatureBoundingBox.css'
import { useState, useEffect } from 'react'
import { Marker, Rectangle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@/components/ui/button'
import { Tag, X } from 'lucide-react'

type LatLng = { lat: number; lng: number }
type Box = { id: number; bounds: [[number, number], [number, number]]; label: string; user_id: string | null; verified: boolean }

// custom icon for the first-click marker (preview start)
const startClickIcon = L.divIcon({
  className: 'start-click-icon',
  html: `<div class="start-click-dot"></div>`,
  iconSize: [18, 18],
  iconAnchor: [0, 0],
})

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
    
      const box: Box = { 
          id: 0, 
          bounds, 
          label, 
          user_id: null,
          verified: false
        }
      setBoxes((s) => [...s, box])
      
      setStart(null)
      setMousePos(null)
      setDrawing(false)
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
              Add Feature
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
      {start && <Marker position={[start.lat, start.lng]} icon={startClickIcon} />} 
      
      {/* preview rectangle while moving mouse after first click */}
      {start && mousePos && (
        <Rectangle bounds={makeBounds(start, mousePos)} pathOptions={{ color: 'blue', dashArray: '6' }} />
      )}

      {/* render saved boxes */}
      {boxes.map((b) => {
        const center = centerOfBounds(b.bounds)
        // divIcon for label (styled via CSS). sanitize label.
        const safeLabel = escapeHtml(b.label || '')
        const icon = L.divIcon({
          className: 'custom-bbox-icon', // container class
          html: `<div class="bbox-label">${safeLabel}</div>`,
          iconSize: undefined,
          iconAnchor: [0, 0],
        })
        return (
          <div key={b.id}>
            <Rectangle
              bounds={b.bounds}
              pathOptions={{ color: 'red' }}
            />
            <Marker
              position={center}
              icon={icon}
              keyboard={false}
              zIndexOffset={1000}
            />
          </div>
        )
      })}
    </>
  )
}