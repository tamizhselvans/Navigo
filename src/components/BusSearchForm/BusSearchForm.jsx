"use client";

import React, { useState } from "react";
import { Bus, Calendar, MapPin, Clock, Wifi, Coffee, Star } from "lucide-react";

const buses = [
  {
    id: 1,
    name: "Royal Express",
    departure: "10:00 AM",
    arrival: "8:00 PM",
    duration: "10h",
    price: 899,
    seatsAvailable: 23,
    rating: 4.5,
    amenities: ["WiFi", "Coffee", "Charging Point"],
  },
  {
    id: 2,
    name: "City Liner",
    departure: "11:30 AM",
    arrival: "9:30 PM",
    duration: "10h",
    price: 799,
    seatsAvailable: 15,
    rating: 4.2,
    amenities: ["WiFi", "Blanket", "Movie"],
  },
  {
    id: 3,
    name: "Night Rider",
    departure: "9:00 PM",
    arrival: "7:00 AM",
    duration: "10h",
    price: 999,
    seatsAvailable: 30,
    rating: 4.7,
    amenities: ["WiFi", "Coffee", "Blanket", "Charging Point"],
  },
];

function BusSearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Bus className="me-2" size={24} />
            RedBus Clone
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section mb-4 text-center py-5 bg-light">
        <h1 className="display-4 fw-bold mb-3">Book Bus Tickets</h1>
        <p className="lead">Travel with comfort and safety</p>
      </div>

      {/* Search Box */}
      <div className="container">
        <div className="search-box p-4 bg-white shadow rounded mb-5">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="fromCity"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <label htmlFor="fromCity">
                  <MapPin size={18} className="me-2" />
                  From
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="toCity"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
                <label htmlFor="toCity">
                  <MapPin size={18} className="me-2" />
                  To
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
                <label htmlFor="date">
                  <Calendar size={18} className="me-2" />
                  Date
                </label>
              </div>
            </div>

            <div className="col-md-3 d-grid">
              <button className="btn btn-danger btn-lg">Search Buses</button>
            </div>
          </div>
        </div>

        {/* Bus Listings */}
        <div className="bus-list">
          {buses.map((bus) => (
            <div key={bus.id} className="card mb-4 bus-card shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <h5 className="card-title mb-1">{bus.name}</h5>
                    <span className="rating-badge text-warning">
                      <Star size={14} className="me-1" />
                      {bus.rating}
                    </span>
                  </div>

                  <div className="col-md-3">
                    <div className="d-flex align-items-center">
                      <Clock size={18} className="me-2" />
                      <div>
                        <div className="fw-bold">{bus.departure}</div>
                        <div className="text-muted">to {bus.arrival}</div>
                        <small className="text-muted">{bus.duration}</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="text-muted">{bus.seatsAvailable} Seats Available</div>
                  </div>

                  <div className="col-md-2">
                    <div className="bus-features d-flex gap-2">
                      {bus.amenities.includes("WiFi") && <Wifi size={18} />}
                      {bus.amenities.includes("Coffee") && <Coffee size={18} />}
                    </div>
                  </div>

                  <div className="col-md-2 text-end">
                    <div className="fw-bold mb-2">₹{bus.price}</div>
                    <button className="btn btn-outline-danger">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusSearchForm;
