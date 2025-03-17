import { Bus, Clock, MapPin, Users, IndianRupee } from "lucide-react";

function BusRouteList({ index, busDetail }) {
  return (
    <div
      className="card bus-card shadow-sm p-3 border-0 rounded-3"
      key={index}
      style={{
        backgroundColor: "#f8f9fa",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      {/* Card Header */}
      <div className="card-header bg-white border-0 rounded-top-3 py-3 px-4">
        <div className="d-flex align-items-center justify-content-between">
          {/* Bus Service Name */}
          <div className="d-flex align-items-center gap-2">
            <Bus size={20} className="text-danger" />
            <span className="fw-semibold text-dark">Government Bus Service</span>
          </div>

          {/* Bus Number */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="fw-bold text-danger">{busDetail.bus.number}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body px-4">
        {/* Route Information */}
        <div className="d-flex align-items-center mb-3 text-dark">
          <MapPin size={16} className="text-danger" />
          <span className="ms-2 fw-semibold">
            {busDetail.route.start} - {busDetail.route.end}
          </span>
        </div>

        {/* Departure & Arrival Times */}
        <div className="row align-items-center mb-4">
          <div className="col-5 text-center">
            <small className="text-muted">Departure</small>
            <strong className="d-block text-dark">{busDetail.departureTime}</strong>
          </div>
          <div className="col-2 text-center">
            <div
              className="route-line"
              style={{ height: "2px", backgroundColor: "#d84e55", width: "100%" }}
            ></div>
          </div>
          <div className="col-5 text-center">
            <small className="text-muted">Arrival</small>
            <strong className="d-block text-dark">{busDetail.arrivalTime}</strong>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Fare */}
          <div className="d-flex align-items-center gap-1">
            <IndianRupee size={16} className="text-primary" />
            <small className="fw-semibold text-dark">₹100</small>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm px-3 rounded-pill">Schedule</button>
            <button
              className="btn btn-danger btn-sm px-3 rounded-pill text-white"
              style={{ backgroundColor: "#d84e55" }}
            >
              Track Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusRouteList;
