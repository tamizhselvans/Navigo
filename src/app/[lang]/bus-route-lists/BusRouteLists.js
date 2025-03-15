import { Bus, Clock, MapPin, Users, IndianRupee, Calendar, Info } from "lucide-react";

function BusRouteList({ key, index, busDetail, arrivalTime }) {
  // console.log(busDetail);

  return (
    <div className="card bus-card shadow-sm" key={index}>
      <div className="card-header text-white" style={{ backgroundColor: "#d84e55" }}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Bus size={20} />
            <span className="fw-semibold">Government Bus Service</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            {busDetail.type.map((type, index) => (
              <span className="badge bg-light text-primary" key={index}>
                {type}
              </span>
            ))}
            <div
              className="govt-seal rounded-circle d-flex align-items-center justify-content-center bg-white"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="text-black fw-bold">{busDetail.bus_number}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-info bus-number">{busDetail.bus_id}</span>
          <span className="badge bg-success">{busDetail.frequency}</span>
        </div>

        <div className="d-flex align-items-center mb-3">
          <MapPin size={16} className="text-primary" />
          <span className="ms-2 route-text">
            {busDetail.source}-{busDetail.destination}
          </span>
        </div>

        <div className="row align-items-center mb-3">
          <div className="col-5 text-center">
            <small className="text-muted d-block">Departure</small>
            <strong>{busDetail.departure[index]}</strong>
          </div>
          <div className="col-2">
            <div className="route-line"></div>
          </div>
          <div className="col-5 text-center">
            <small className="text-muted d-block">Arrival</small>
            <strong>{arrivalTime}</strong>
          </div>
        </div>

        <div className="quick-info">
          <div className="quick-info-item">
            <Users size={16} className="text-primary" />
            <small>{busDetail.availableSeats}</small>
          </div>
          <div className="quick-info-item">
            <IndianRupee size={16} className="text-primary" />
            <small>₹{busDetail.fare}</small>
          </div>
          <button className="btn btn-outline-secondary btn-sm">Schedule</button>
          <button className="btn btn-primary btn-sm" style={{ backgroundColor: "#d84e55" }}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusRouteList;
