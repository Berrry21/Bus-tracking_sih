import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default icon issue in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function MapView({ buses = [], stops = [] }) {
  const center = buses.length
    ? [buses[0].lat || 17.421, buses[0].lng || 78.512]
    : [17.421, 78.512];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {stops.map((stop) => (
          <Marker key={`stop-${stop.id}`} position={[stop.lat, stop.lng]}>
            <Popup><strong>Stop:</strong> {stop.name}</Popup>
          </Marker>
        ))}

        {buses.map((bus) => (
          <Marker key={`bus-${bus.id}`} position={[bus.lat, bus.lng]}>
            <Popup>
              <div>
                <div><strong>Bus:</strong> {bus.route}</div>
                <div><strong>Last seen:</strong> {new Date(bus.lastSeen).toLocaleTimeString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
