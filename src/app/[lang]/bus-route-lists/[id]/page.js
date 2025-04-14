"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TrackBus from "@/components/BusDetailPage/TrackBus";
import { useParams, useSearchParams } from "next/navigation";
import "@/app/styles/busRouteLists.css";
import Loading from "@/components/status/Loading";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const lang = params.lang;
  const id = params.id;

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [busList, setBusList] = useState([]);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBuses?from=${from}&to=${to}&busId=${id}`
        );
        setBusList(data.busList || []);
      } catch (err) {
        // setError("Error fetching buses. Please try again later.");
        console.log("Error fetching buses. Please try again later.");
      }
    };

    fetchBusData();
    const timer = setTimeout(() => {
      fetchBusData();
    }, 10000);
    return () => clearTimeout(timer);
  }, [from, to, id]);

  //  ==============
  // We have to work on this after completing the GPS data upload to the server, and then fetch the data from the database using an API
  const currentBusPosition = [9.545, 78.4766];
  //  ==============

  if (busList.length === 0) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <TrackBus lang={lang} currentBusPosition={currentBusPosition} busData={busList[0]} />
    </div>
  );
}
