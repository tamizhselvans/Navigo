"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const LeafletMap = dynamic(() => import("./MapEmbed"), {
  ssr: false,
});

const TrackBus = ({ lang, busData, currentBusPosition, seatCount }) => {
  const { arrivalTime, departureTime, date, status, bus, route } = busData;
  const [placeName, setPlaceName] = useState("Unknown Location");

  useEffect(() => {
    const getPlaceName = async (latitude, longitude) => {
      const url = `/api/getPlaceName?latitude=${latitude}&longitude=${longitude}`;
      //const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=${apiKey}`;
      try {
        const response = await axios.get(url);

        setPlaceName(response.data.place || "Unknown Location");
      } catch (error) {
        setPlaceName("Location not found");
      }
    };
    getPlaceName(currentBusPosition[0], currentBusPosition[1]);
  }, [currentBusPosition]);

  return (
    <div className="container my-4">
      <div className="card shadow-lg border-0">
        <div className="card-header text-white" style={{ backgroundColor: "#111626" }}>
          <h4 className="mb-0">{route.name}</h4>
          <small className="text-light">
            Date: {date} | Status:{" "}
            <span className={`badge bg-${status === "Running" ? "success" : "danger"}`}>
              {status}
            </span>
          </small>
        </div>
        <div className="card-body">
          <h5 className="card-title">Bus Number: {bus.number}</h5>
          <p className="card-text">
            <strong>Departure:</strong> {departureTime} <br />
            <strong>Arrival:</strong> {arrivalTime} <br />
            <strong>Seat Availability:</strong>{" "}
            {seatCount < 10 ? "Free" : seatCount < 50 ? "Partially filled" : "Full"}
          </p>

          <hr />
          <h6 className="mb-3">Bus Current Location</h6>
          <LeafletMap position={currentBusPosition} placeName={placeName} />

          <hr />
          <h6 className="mb-3">Route Stops</h6>
          <ul className="timeline list-unstyled">
            {route.stops.map((stop, index) => (
              <li className="mb-4 d-flex" key={stop.id}>
                <div className="me-3">
                  <div
                    className="rounded-circle bg-secondary"
                    style={{ width: "12px", height: "12px", marginTop: "6px" }}
                  ></div>
                  {index < route.stops.length - 1 && (
                    <div className="border-start border-2 border-secondary h-100 mx-auto"></div>
                  )}
                </div>
                <div>
                  <strong>{stop.name}</strong>
                  <div>
                    {stop.departureTime && (
                      <small className="text-muted">Departure: {stop.departureTime}</small>
                    )}
                    <br />
                    {stop.arrivalTime && (
                      <small className="text-muted">Arrival: {stop.arrivalTime}</small>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackBus;
