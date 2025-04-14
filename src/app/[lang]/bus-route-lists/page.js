import { getTranslations } from "next-intl/server";
import BusList from "./BusLists";
import "@/app/styles/busRouteLists.css";
import axios from "axios";
import Empty from "@/components/status/Empty";
// import fetchBusRoutes from "@/app/actions/getBusList/getBus";

export async function generateMetadata({ params }) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
        ta: `${process.env.NEXT_PUBLIC_BASE_URL}/ta`,
      },
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const { from, to } = await searchParams;
  const t = await getTranslations("BusShedulePage");
  const busId = 0;
  let busList = [],
    busListCount = 0;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBuses?from=${from}&to=${to}&busId=${busId}`
    );

    ({ busList, busListCount } = data);
  } catch (error) {
    return (
      <div>
        <h3>Error fetching buses. Please try again later.</h3>
      </div>
    );
  }
  // console.log("bus list", busList, "bus count", busListCount);

  return (
    <>
      <div className="min-vh-100 bg-white  mt-5">
        <div className="text-dark fw-bold fs-5 text-center w-100" style={{ marginTop: "4rem" }}>
          {t("availableBuses")}: <span style={{ color: "#111626" }}>{busListCount}</span>
        </div>

        <div className="bus-cards-container">
          {busListCount != 0 ? (
            busList.map((busDetail, index) => (
              <BusList
                lang={lang}
                key={index}
                index={index}
                busDetail={busDetail}
                busListCount={busListCount}
                from={from}
                to={to}
              />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}
