import { getDatabase, ref, get, query, orderByChild } from "firebase/database";
import { db } from "@/lib/firebase";

const fetchBusRoutes = async (from, to) => {
  try {
    from = from.toLowerCase();
    to = to.toLowerCase();

    const [routesSnapshot, busesSnapshot, schedulesSnapshot] = await Promise.all([
      get(ref(db, "routes")),
      get(ref(db, "buses")),
      get(query(ref(db, "schedules"), orderByChild("routeId"))),
    ]);

    if (!routesSnapshot.exists() || !busesSnapshot.exists() || !schedulesSnapshot.exists()) {
      return { busList: [], busListCount: 0 };
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

    if (!fromStops.length || !toStops.size) return { busList: [], busListCount: 0 };

    const validRoutes = fromStops
      .map(({ routeId, order }) => ({
        routeId,
        fromOrder: order,
        toOrder: toStops.get(routeId) ?? Infinity,
      }))
      .filter(({ fromOrder, toOrder }) => toOrder > fromOrder);

    if (!validRoutes.length) return { busList: [], busListCount: 0 };

    const busList = schedulesData
      .filter(({ routeId }) => validRoutes.some((r) => r.routeId == routeId))
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

    return { busList, busListCount: busList.length };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { busList: [], busListCount: 0 };
  }
};

export default fetchBusRoutes;
