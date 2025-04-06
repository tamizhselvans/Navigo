import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from")?.toLowerCase() || "";
  const to = searchParams.get("to")?.toLowerCase() || "";
  const busIdParam = searchParams.get("busId");
  let busId = null;

  if (busIdParam === 0) {
    busId = null;
  } else {
    busId = parseInt(busIdParam) || null;
  }

  try {
    const [routesSnapshot, busesSnapshot, schedulesSnapshot] = await Promise.all([
      get(ref(db, "routes")),
      get(ref(db, "buses")),
      get(ref(db, "schedules")),
    ]);

    if (!routesSnapshot.exists() || !busesSnapshot.exists() || !schedulesSnapshot.exists()) {
      return NextResponse.json({ busList: [], busListCount: 0 });
    }

    const routesData = routesSnapshot.val();
    const busesData = busesSnapshot.val();
    const schedulesData = Object.values(schedulesSnapshot.val());

    const fromStops = [];
    const toStops = new Map();

    for (const [routeId, route] of Object.entries(routesData)) {
      Object.values(route.stops).forEach(({ name, order }) => {
        const stopName = name.toLowerCase();
        if (stopName === from) fromStops.push({ order, routeId });
        if (stopName === to) toStops.set(routeId, order);
      });
    }

    if (!fromStops.length || !toStops.size) {
      return NextResponse.json({ busList: [], busListCount: 0 });
    }

    const validRoutes = fromStops
      .map(({ routeId, order }) => ({
        routeId,
        fromOrder: order,
        toOrder: toStops.get(routeId) ?? Infinity,
      }))
      .filter(({ fromOrder, toOrder }) => toOrder > fromOrder);

    if (!validRoutes.length) {
      return NextResponse.json({ busList: [], busListCount: 0 });
    }

    const busList = schedulesData
      .filter(
        ({ routeId, busId: scheduleBusId }) =>
          validRoutes.some((r) => r.routeId == routeId) &&
          (busId === null || scheduleBusId == busId)
      )
      .map((schedule) => {
        const { routeId, busId } = schedule;
        const routeData = routesData[routeId];
        const busDetail = busesData[busId] || { number: "Unknown" };

        return {
          ...schedule,
          bus: { id: busId, number: busDetail.number },
          route: {
            ...routeData,
            stops: Object.values(routeData.stops).sort((a, b) => a.order - b.order),
          },
        };
      });
    // console.log(busList);

    return NextResponse.json({ busList, busListCount: busList.length });
  } catch (error) {
    console.error("Error fetching buses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
