"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import TrackBus from "./TrackBus";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const busIcon = new L.Icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/018/931/177/non_2x/black-bus-icon-png.png", // use a custom PNG/SVG
  iconSize: [40, 40],
});

export default function BusMap({ busStops, currentBusPosition, busData }) {
  const stopCoordinates = busStops.map((stop) => [stop.lat, stop.lng]);
  //console.log(busStops);

  return (
    <>
      <TrackBus busData={busData[0]} />;
      <MapContainer
        center={currentBusPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Bus stops */}
        {/* {busStops.map((stop, index) => (
        <Marker
          key={index}
          position={[stop.lat, stop.lng]}
          // icon={
          //   "https://static.vecteezy.com/system/resources/previews/018/931/177/non_2x/black-bus-icon-png.png"
          // }
        >
          <Popup>{stop.name}</Popup>
        </Marker>
      ))} */}

        {/* Bus current location */}
        <Marker position={currentBusPosition} icon={busIcon}>
          <Popup>Current Bus Location</Popup>
        </Marker>

        {/* Polyline path */}
        <Polyline positions={stopCoordinates} color="blue" />
      </MapContainer>
    </>
  );
}
