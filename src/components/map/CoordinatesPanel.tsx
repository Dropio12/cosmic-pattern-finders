import './CoordinatesPanel.css'
import { useState, useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'

export default function CoordinatesPanel() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  const map = useMapEvents({
    move: () => {
      const c = map.getCenter()
      setCoords({ lat: c.lat, lng: c.lng })
    },
    click: (e) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    mousemove: (e) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    zoomend: () => {
      const c = map.getCenter()
      setCoords({ lat: c.lat, lng: c.lng })
    }
  })

  useEffect(() => {
    const c = map.getCenter()
    setCoords({ lat: c.lat, lng: c.lng })
  }, [map])

  if (!coords) return null

  return (
    <div className="coords-panel">
      Lat: {coords.lat.toFixed(5)} Lng: {coords.lng.toFixed(5)}
    </div>
  )
}