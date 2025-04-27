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
      const sortedFromPlace = allPlaces.filter((place) =>
        place.toLowerCase().includes(fromInput.toLowerCase())
      );
      setFromSuggestions(sortedFromPlace);
      if (
        sortedFromPlace.length === 1 &&
        sortedFromPlace[0].toLowerCase() === fromInput.toLowerCase()
      ) {
        setFromSuggestions([]);
      }
    } else {
      setFromSuggestions([]);
    }

    if (toInput) {
      const sortedToPlace = allPlaces.filter((place) =>
        place.toLowerCase().includes(toInput.toLowerCase())
      );
      setToSuggestions(sortedToPlace);
      if (sortedToPlace.length === 1 && sortedToPlace[0].toLowerCase() === toInput.toLowerCase()) {
        setToSuggestions([]);
      }
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
      <div
        className="hero-section mb-4 text-center py-5"
        style={{
          marginTop: "60px",
          backgroundImage:
            "url('https://i1.modland.net/i/60a949f301b83/ets2_20210426_204531_00-lg_modland.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className="container mb-4">
          <div className="row justify-content-start">
            <div className="col-md-6 text-start">
              <h1 className="display-1 fw-bold">Navigo</h1>
              <p className="lead fs-4">Track, ride, repeat.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="search-box p-4 shadow rounded mb-5"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: "16px",
          }}
        >
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
            <div className="col-md-3 d-grid ms-auto">
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
