import { getTranslations } from "next-intl/server";
import BusRouteList from "@/app/[lang]/bus-route-lists/BusRouteLists";
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
// import { db } from "firebase/database";
import prisma from "@/lib/prismadb";
import "@/app/styles/busRouteLists.css";

const fetchBusRoutes = async (from, to) => {
  try {
    const fromStops = await prisma.busStop.findMany({
      where: { name: from },
      select: { order: true, routeId: true },
    });

    const toStops = await prisma.busStop.findMany({
      where: { name: to },
      select: { order: true, routeId: true },
    });

    if (fromStops.length === 0 || toStops.length === 0) {
      return [];
    }

    const validRoutes = fromStops
      .map((fs) => ({
        routeId: fs.routeId,
        fromOrder: fs.order,
        toOrder: toStops.find((ts) => ts.routeId === fs.routeId)?.order || Infinity,
      }))
      .filter((route) => route.toOrder > route.fromOrder); // Ensure proper direction

    if (validRoutes.length === 0) {
      throw new Error(`No valid routes found from ${from} to ${to}.`);
    }

    const schedules = await prisma.busSchedule.findMany({
      where: {
        routeId: { in: validRoutes.map((r) => r.routeId) },
      },
      orderBy: { arrivalTime: "asc" },
      include: {
        bus: true,
        route: {
          include: {
            stops: true,
          },
        },
      },
    });

    return schedules;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

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
  // const t = await getTranslations("HomePage");
  const busRoutes = await fetchBusRoutes(from, to);
  console.log(busRoutes);
  // console.log(from, to);

  return (
    <>
      <div className="min-vh-100 bg-white  mt-5">
        <div className="bus-cards-container">
          {busRoutes.length != 0 &&
            busRoutes.map((busDetail, index) => (
              <BusRouteList key={index} index={index} busDetail={busDetail} />
            ))}
        </div>
      </div>
    </>
  );
}
