import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import axios from "axios";
import { NextResponse } from "next/server";
import { DOMParser } from "xmldom"; // use `npm install xmldom`

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const latitude = searchParams.get("latitude") || "";
  const longitude = searchParams.get("longitude") || "";
  const url = `http://api.geonames.org/findNearbyPlaceName?lat=${latitude}&lng=${longitude}&username=wazil`;

  try {
    const response = await axios.get(url);
    console.log(response);
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "application/xml");

    const toponymElement = xmlDoc.getElementsByTagName("toponymName")[0];
    const toponymName = toponymElement ? toponymElement.textContent : "Unknown";

    return NextResponse.json({ place: toponymName });
  } catch (error) {
    console.error("Error fetching or parsing data:", error.message);
    return NextResponse.json({ place: "Error retrieving location" });
  }
}
