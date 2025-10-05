import './FeatureBoundingBox.css'
import { useState } from 'react'
import { Marker, Rectangle, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

type LatLng = { lat: number; lng: number }
type Box = { id: number; bounds: [[number, number], [number, number]]; label: string }

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

  const handleMapClick = (p: LatLng) => {
    if (!start) {
      // first click: set start point
      setStart(p)
    } else {
      // second click: finalize box, prompt for label
      const bounds = makeBounds(start, p)
      const label = window.prompt('Label for bounding box:', '') || ''
      const box: Box = { id: Date.now(), bounds, label }
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
            <Rectangle bounds={b.bounds} pathOptions={{ color: 'red' }} />
            <Marker
              position={center}
              icon={icon}
              interactive={false}
              keyboard={false}
              zIndexOffset={1000}
            />
          </div>
        )
      })}
    </>
  )
}