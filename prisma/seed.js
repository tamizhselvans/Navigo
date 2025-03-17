const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create buses
  const bus1 = await prisma.bus.create({
    data: { number: "TN-75-1234", capacity: 50 },
  });

  const bus2 = await prisma.bus.create({
    data: { number: "TN-64-5678", capacity: 40 },
  });

  // Create Route: Ramanathapuram → Madurai
  const route1 = await prisma.route.create({
    data: {
      name: "Ramanathapuram to Madurai",
      start: "Ramanathapuram",
      end: "Madurai",
      stops: {
        create: [
          { name: "Ramanathapuram", order: 1 },
          { name: "Paramakudi", order: 2 },
          { name: "Manamadurai", order: 3 },
          { name: "Madurai", order: 4 },
        ],
      },
    },
  });

  // Create Route: Madurai → Ramanathapuram
  const route2 = await prisma.route.create({
    data: {
      name: "Madurai to Ramanathapuram",
      start: "Madurai",
      end: "Ramanathapuram",
      stops: {
        create: [
          { name: "Madurai", order: 1 },
          { name: "Manamadurai", order: 2 },
          { name: "Paramakudi", order: 3 },
          { name: "Ramanathapuram", order: 4 },
        ],
      },
    },
  });

  // Create Bus Schedules
  await prisma.busSchedule.createMany({
    data: [
      {
        busId: bus1.id,
        routeId: route1.id,
        date: new Date(),
        status: "Running",
        departureTime: "08:00 AM",
        arrivalTime: "10:00 AM",
      },
      {
        busId: bus2.id,
        routeId: route2.id,
        date: new Date(),
        status: "Running",
        departureTime: "02:00 PM",
        arrivalTime: "04:00 PM",
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
