"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { ref, onValue, off } from "firebase/database";
import Loading from "@/components/status/Loading";
import TrackBus from "@/components/BusDetailPage/TrackBus";
import "@/app/styles/busRouteLists.css";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const lang = params.lang;
  const id = params.id;

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [busList, setBusList] = useState([]);
  const [seatCount, setSeatCount] = useState({});
  const [currentBusPosition, setCurrentBusPosition] = useState([0.0, 0.0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBuses?from=${from}&to=${to}&busId=${id}`
        );

        setBusList(data.busList);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching buses:", err);
        setIsLoading(false);
      }
    };

    fetchBusData();
    // const timer = setInterval(fetchBusData, 10000);
    // return () => clearInterval(timer);
  }, [from, to, id]);

  useEffect(() => {
    const busRef = ref(db, `buses/${id}`);

    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setCurrentBusPosition([data.langitude, data.longitude]);
      }
    });

    return () => off(busRef, "value", unsubscribe);
  }, [id]);

  useEffect(() => {
    const seatRef = ref(db, `seatCount/${id}`);

    const unsubscribe = onValue(seatRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setSeatCount(data.seats);
      }
    });

    return () => off(seatRef, "value", unsubscribe);
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <TrackBus
        lang={lang}
        currentBusPosition={currentBusPosition}
        busData={busList[0]}
        seatCount={seatCount}
      />
    </div>
  );
}
