import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  //console.log(req.url);

  const from = searchParams.get("from")?.toLowerCase() || "";
  const to = searchParams.get("to")?.toLowerCase() || "";
  const busIdParam = searchParams.get("busId");

  const busId = busIdParam === "0" ? null : parseInt(busIdParam) || null;

  try {
    // Fetch only schedules first, which is the entry point
    const schedulesSnapshot = await get(ref(db, "schedules"));
    if (!schedulesSnapshot.exists()) {
      return NextResponse.json({ busList: [], busListCount: 0 });
    }

    const schedules = Object.values(schedulesSnapshot.val());

    const routeIdsToFetch = new Set(schedules.map((s) => s.routeId));

    const [routesSnapshot, busesSnapshot] = await Promise.all([
      get(ref(db, "routes")),
      get(ref(db, "buses")),
    ]);

    const routes = routesSnapshot.exists() ? routesSnapshot.val() : {};
    const buses = busesSnapshot.exists() ? busesSnapshot.val() : {};

    const fromStops = [];
    const toStops = new Map();

    for (const routeId of routeIdsToFetch) {
      const route = routes[routeId];
      if (!route || !route.stops) continue;

      for (const { name, order } of Object.values(route.stops)) {
        const stopName = name.toLowerCase();
        if (stopName === from) fromStops.push({ order, routeId });
        if (stopName === to) toStops.set(routeId, order);
      }
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

    const validRouteIds = new Set(validRoutes.map((r) => r.routeId));

    const busList = schedules
      .filter(
        ({ routeId, busId: scheduleBusId }) =>
          validRouteIds.has(routeId) && (busId === null || scheduleBusId === busId)
      )
      .map((schedule) => {
        const { routeId, busId } = schedule;
        const route = routes[routeId];
        const bus = buses[busId] || { number: "Unknown" };

        return {
          ...schedule,
          bus: { id: busId, number: bus.number },
          route: {
            ...route,
            stops: Object.values(route.stops).sort((a, b) => a.order - b.order),
          },
        };
      });

    return NextResponse.json({ busList, busListCount: busList.length });
  } catch (error) {
    console.error("Error fetching buses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
