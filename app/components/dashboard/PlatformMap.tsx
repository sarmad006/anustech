'use client'

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet'
import { Icon, LatLngBounds, LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Define interfaces
interface PlatformLocation {
  id: number
  name: string
  status: 'active' | 'maintenance' | 'inactive'
  lat: number
  lng: number
  address: string
  lastUpdate: string
}

// Map Controller Component
const MapController = () => {
  const map = useMap()
  
  useEffect(() => {
    const israelBounds = new LatLngBounds(
      new LatLng(29.45, 34.25), // Southwest
      new LatLng(33.35, 35.95)  // Northeast
    )
    map.setMaxBounds(israelBounds)
    map.fitBounds(israelBounds)
  }, [map])

  return null
}

const PlatformMap = () => {
  // Israel GeoJSON data
  const israelCoordinates = {
    "type": "Feature",
    "properties": { "name": "Israel" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [35.0018480286, 29.5011780424],
        [34.9648371587, 29.5441618617],
        [34.9276885838, 29.6155981413],
        [34.9557784973, 29.6868033222],
        [34.9780261871, 29.7517903095],
        [34.9975661627, 29.8200088675],
        [35.0234344557, 29.8864911726],
        [35.0552723115, 29.9506008325],
        [35.0925472952, 30.0115816011],
        [35.1345814679, 30.0687738531],
        [35.1806765784, 30.1214147186],
        [35.2300366693, 30.1687499999],
        [35.2817695026, 30.2100393351],
        [35.3348865895, 30.2445616981],
        [35.3883111804, 30.2716276829],
        [35.4408811769, 30.2905934677],
        [35.4914558134, 30.3008627605],
        [35.5389279733, 30.3019943296],
        [35.5823340657, 30.2937040976],
        [35.6208746605, 30.2759669508],
        [35.6538293155, 30.2489249299],
        [35.6806741154, 30.2128878316],
        [35.7009848644, 30.1682353298],
        [35.7144380383, 30.1154325736],
        [35.7207111761, 30.0550273474],
        [35.7196842593, 29.9876488184],
        [35.7213591861, 29.9197661683],
        [35.7256795062, 29.8514755307],
        [35.7325865015, 29.7828977315],
        [35.7420196157, 29.7141674595],
        [35.7539074481, 29.6454236937],
        [35.7681680392, 29.5768098388],
        [35.7847085312, 29.5084726028],
        [34.9648371587, 29.5441618617],
        [35.0018480286, 29.5011780424]
      ]]
    }
  }

  // Platform locations data
  const platforms: PlatformLocation[] = [
    {
      id: 1,
      name: 'במה #45',
      status: 'active',
      lat: 32.0853,
      lng: 34.7818,
      address: 'דיזנגוף סנטר, תל אביב',
      lastUpdate: 'לפני 2 שעות'
    },
    {
      id: 2,
      name: 'במה #32',
      status: 'maintenance',
      lat: 31.7683,
      lng: 35.2137,
      address: 'מתחם התחנה, ירושלים',
      lastUpdate: 'לפני 30 דקות'
    },
    {
      id: 3,
      name: 'במה #28',
      status: 'inactive',
      lat: 32.7940,
      lng: 34.9896,
      address: 'נמל חיפה',
      lastUpdate: 'לפני שעה'
    }
  ]

  // Custom icons for different platform statuses
  const statusIcons = {
    active: new Icon({
      iconUrl: '/marker-active.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    maintenance: new Icon({
      iconUrl: '/marker-maintenance.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    inactive: new Icon({
      iconUrl: '/marker-inactive.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  // Helper functions for status colors and text
  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      maintenance: 'bg-yellow-500',
      inactive: 'bg-red-500'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  const getStatusText = (status: string) => {
    const texts = {
      active: 'פעיל',
      maintenance: 'בתחזוקה',
      inactive: 'לא זמין'
    }
    return texts[status as keyof typeof texts] || 'לא ידוע'
  }

  // Map bounds
  const israelBounds = new LatLngBounds(
    new LatLng(29.45, 34.25), // Southwest
    new LatLng(33.35, 35.95)  // Northeast
  )

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-700">
      <MapContainer
        bounds={israelBounds}
        maxBounds={israelBounds}
        minZoom={8}
        maxZoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        <MapController />
        
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

      

        {platforms.map((platform) => (
          <Marker
            key={platform.id}
            position={[platform.lat, platform.lng]}
            icon={statusIcons[platform.status]}
          >
            <Popup className="custom-popup">
              <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">{platform.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(platform.status)} bg-opacity-20 text-white`}>
                    {getStatusText(platform.status)}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>{platform.address}</p>
                  <p className="text-xs">עדכון אחרון: {platform.lastUpdate}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default PlatformMap