import { getTranslations } from "next-intl/server";
import BusRouteList from "./BusRouteLists";
import "@/app/styles/busRouteLists.css";
import fetchBusRoutes from "@/app/actions/getBusList/getBus";

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
  const { busList, busListCount } = await fetchBusRoutes(from, to);
  // console.log("bus list", busList, "bus count", busListCount);

  return (
    <>
      <div className="min-vh-100 bg-white  mt-5">
        <div className="text-dark fw-bold fs-5 text-center w-100" style={{ marginTop: "4rem" }}>
          {t("availableBuses")}: <span className="text-danger">{busListCount}</span>
        </div>

        <div className="bus-cards-container">
          {busListCount != 0 &&
            busList.map((busDetail, index) => (
              <BusRouteList
                key={index}
                index={index}
                busDetail={busDetail}
                busListCount={busListCount}
              />
            ))}
        </div>
      </div>
    </>
  );
}
