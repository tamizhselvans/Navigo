import { getDatabase, ref, get, child } from "firebase/database";
import { db } from "@/lib/firebase";

const fetchBusRoutes = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `places`));

    if (snapshot.exists()) {
      const places = snapshot.val();
      const placeNames = Object.values(places).map((place) => place.name);
      return placeNames;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export default fetchBusRoutes;
