// "use client";
import { getTranslations } from "next-intl/server";
// import dynamic from "next/dynamic";
import axios from "axios";
import BusMap from "@/components/BusDetailPage/MapEmbed";
import "@/app/styles/busRouteLists.css";

// const BusMap = dynamic(() => import("@/components/BusDetailPage/MapEmbed"), {
//   ssr: false,
// });

export default async function Page({ params, searchParams }) {
  const { lang, id } = await params;
  const { from, to } = await searchParams;
  const t = await getTranslations("BusPage");

  let busList = [],
    busListCount = 0;

  // const busStops = [
  //   { name: "Ramanathapuram", lat: 9.3716, lng: 78.8308 },
  //   { name: "Paramakudi", lat: 9.5442, lng: 78.5901 },
  //   { name: "Manamadurai", lat: 9.545, lng: 78.4766 },
  //   { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  // ];

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBuses?from=${from}&to=${to}&busId=${id}`
    );

    ({ busList, busListCount } = data);
    //console.log(busList);
  } catch (error) {
    return (
      <div>
        <h3>Error fetching buses. Please try again later.</h3>
      </div>
    );
  }

  const currentBusPosition = [9.3716, 78.8308];

  const busDetail = await busList[0].route.stops;

  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <BusMap
          lang={lang}
          busStops={busDetail}
          currentBusPosition={currentBusPosition}
          busData={busList}
        />
      </div>
    </>
  );
}
