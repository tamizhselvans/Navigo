"use client";

import React, { useState } from "react";
import { Bus, Calendar, MapPin, Clock, Wifi, Coffee, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function BusSearchForm({ lang }) {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    router.push(`/${lang}/bus-route-lists?from=${data.from}&to=${data.to}`);
  };

  return (
    <div>
      <div className="hero-section mb-4 text-center py-5 bg-light">
        <h1 className="display-4 fw-bold mb-3">Book Bus Tickets</h1>
        <p className="lead">Travel with comfort and safety</p>
      </div>

      <div className="container">
        <div className="search-box p-4 bg-white shadow rounded mb-5">
          <div className="row g-3">
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
              {/* From City */}
              <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="fromCity"
                    placeholder="From"
                    {...register("from", { required: true })}
                  />
                  <label htmlFor="fromCity">
                    <MapPin size={18} className="me-2" />
                    {t("from")}
                  </label>
                </div>
              </div>

              {/* To City */}
              <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="toCity"
                    placeholder="To"
                    {...register("to", { required: true })}
                  />
                  <label htmlFor="toCity">
                    <MapPin size={18} className="me-2" />
                    {t("to")}
                  </label>
                </div>
              </div>

              {/* Date */}
              {/* <div className="col-md-3">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    {...register("date", { required: true })}
                  />
                  <label htmlFor="date">
                    <Calendar size={18} className="me-2" />
                    {t("date")}
                  </label>
                </div>
              </div> */}

              {/* Search Button */}
              <div className="col-md-3 d-grid">
                <button type="submit" className="btn btn-danger btn-lg">
                  {t("searchBus")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusSearchForm;
