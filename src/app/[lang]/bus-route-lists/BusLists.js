import Link from "next/link";
import { Bus, Clock, MapPin, Users, IndianRupee, Calendar, Info } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function BusList({ lang, index, busDetail, from, to }) {
  const t = await getTranslations("BusShedulePage");

  const fromStop = busDetail.route.stops.find(
    (stop) => stop.name.toLowerCase() === from.toLowerCase()
  );
  const toStop = busDetail.route.stops.find((stop) => stop.name.toLowerCase() === to.toLowerCase());

  return (
    <div className="card bus-card shadow-sm" key={index}>
      <div className="card-header text-black rounded-top-3 py-3 px-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Bus size={20} />
            <span className="fw-semibold">{t("governmentBus")}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div
              className="govt-seal rounded-circle d-flex align-items-center justify-content-center bg-white"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="text-black fw-bold">{busDetail.bus.number}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <MapPin size={16} className="text-primary" />
          <span className="ms-2 route-text">
            {from} - {to}
          </span>
        </div>

        <div className="row align-items-center mb-3">
          <div className="col-5 text-center">
            <small className="text-muted d-block">{t("departure")}</small>
            <strong>{fromStop?.departureTime || "-"}</strong>
          </div>
          <div className="col-2">
            <div className="route-line"></div>
          </div>
          <div className="col-5 text-center">
            <small className="text-muted d-block">{t("arrival")}</small>
            <strong>{toStop?.arrivalTime || "-"}</strong>
          </div>
        </div>

        <div className="quick-info mt-3">
          <div className="quick-info-item">
            <IndianRupee size={16} className="text-primary" />
            <small>₹100</small>
          </div>
          <button className="btn btn-outline-secondary btn-sm">{t("schedule")}</button>
          <Link
            href={`/${lang}/bus-route-lists/${busDetail.bus.id}?from=${from}&to=${to}`}
            className="btn btn-outline-secondary btn-sm"
            style={{ backgroundColor: "#d84e55", color: "white" }}
          >
            {t("track")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BusList;
