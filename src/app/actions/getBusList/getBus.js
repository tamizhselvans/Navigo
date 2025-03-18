import prisma from "@/lib/prismadb";

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
      .filter((route) => route.toOrder > route.fromOrder);

    if (validRoutes.length === 0) {
      return [];
    }

    const busList = await prisma.busSchedule.findMany({
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
    const busListCount = await prisma.busSchedule.count({
      where: {
        routeId: { in: validRoutes.map((r) => r.routeId) },
      },
    });

    return { busList, busListCount };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
export default fetchBusRoutes;
