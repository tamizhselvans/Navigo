"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LeafletMap({ position, placeName }) {
  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="background:#fff;padding:4px 8px;border-radius:4px;box-shadow:0 0 5px rgba(0,0,0,0.3);font-size:14px; margin-bottom:4px;">
         ${placeName}
        </div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png" style="height: 25px;" />
      </div>
    `,
    iconSize: [100, 60],
    iconAnchor: [50, 60],
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon} />
    </MapContainer>
  );
}
