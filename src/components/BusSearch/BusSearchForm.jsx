"use client";

import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import fetchBusRoutes from "@/app/actions/getPlace/getStops";
import { all } from "axios";

function BusSearchForm({ lang }) {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const [allPlaces, setAllPlaces] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const fromInput = watch("from");
  const toInput = watch("to");

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchBusRoutes();
      setAllPlaces(places);
      //console.log(places);
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    //console.log(allPlaces);
    //console.log(fromInput, toInput);

    if (fromInput) {
      setFromSuggestions(
        allPlaces.filter((place) => place.toLowerCase().includes(fromInput.toLowerCase()))
      );
    } else {
      setFromSuggestions([]);
    }

    if (toInput) {
      setToSuggestions(
        allPlaces.filter((place) => place.toLowerCase().includes(toInput.toLowerCase()))
      );
    } else {
      setToSuggestions([]);
    }
  }, [fromInput, toInput, allPlaces]);

  const onSubmit = (data) => {
    router.push(`/${lang}/bus-route-lists?from=${data.from}&to=${data.to}`);
  };

  const handleSelect = (field, value) => {
    setValue(field, value);
    if (field === "from") setFromSuggestions([]);
    if (field === "to") setToSuggestions([]);
  };

  return (
    <>
      <div className="hero-section mb-4 text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Book Bus Tickets</h1>
        <p className="lead">Travel with comfort and safety</p>
      </div>

      <div className="container">
        <div className="search-box p-4 bg-white shadow rounded mb-5">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            {/* From City */}
            <div className="col-md-3 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="fromCity"
                  placeholder="From"
                  autoComplete="off"
                  {...register("from", { required: true })}
                />
                <label htmlFor="fromCity">
                  <MapPin size={18} className="me-2" />
                  {t("from")}
                </label>
              </div>
              {fromSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 z-3">
                  {fromSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelect("from", suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To City */}
            <div className="col-md-3 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="toCity"
                  placeholder="To"
                  autoComplete="off"
                  {...register("to", { required: true })}
                />
                <label htmlFor="toCity">
                  <MapPin size={18} className="me-2" />
                  {t("to")}
                </label>
              </div>
              {toSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 z-3">
                  {toSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelect("to", suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Button */}
            <div className="col-md-3 d-grid">
              <button
                type="submit"
                className="btn btn search-box"
                style={{ backgroundColor: "#111626", color: "white" }}
              >
                {t("searchBus")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BusSearchForm;
