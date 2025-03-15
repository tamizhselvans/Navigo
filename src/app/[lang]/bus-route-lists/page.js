import { getTranslations } from "next-intl/server";
import BusRouteList from "@/app/[lang]/bus-route-lists/BusRouteLists";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "@/app/styles/busRouteLists.css";

//Need to connect this data into Db
// const busRoutes = [
//   {
//     id: "KA-01-F-1234",
//     busNumber: "6A",
//     route: "Bangalore - Mysore",
//     departure: "06:00 AM",
//     arrival: "09:30 AM",
//     availableSeats: 45,
//     fare: 180,
//     type: "Air Conditioned",
//     frequency: "Daily",
//   },
//   {
//     id: "KA-01-F-5678",
//     busNumber: "2B",
//     route: "Bangalore - Hassan",
//     departure: "07:00 AM",
//     arrival: "11:30 AM",
//     availableSeats: 38,
//     fare: 220,
//     type: "Air Conditioned",
//     frequency: "Daily",
//   },
// ];

const fetchBusRoutes = async () => {
  try {
    const q = query(
      collection(db, "busRoutes"),
      where("source", "==", "Ramanathapuram"),
      where("destination", "==", "Madurai")
    );
    const querySnapshot = await getDocs(q);

    const routes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return routes;
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

export default async function Page({ params }) {
  const { lang } = await params;
  // const t = await getTranslations("HomePage");
  const busRoutes = await fetchBusRoutes();
  // s

  return (
    <>
      <div className="min-vh-100 bg-light mt-5">
        <div className="bus-cards-container">
          {busRoutes.map((busDetail) =>
            busDetail.arrival.map((arrivalTime, index) => (
              <BusRouteList
                key={index}
                index={index}
                busDetail={busDetail}
                arrivalTime={arrivalTime}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
