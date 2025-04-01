import { db } from "@/lib/firebase";
import { ref, update } from "firebase/database";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { busId, langitude, longitude } = await req.json();

    if (!busId || langitude == null || longitude == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const busRef = ref(db, `buses/${busId}`);

    await update(busRef, { langitude, longitude });

    return NextResponse.json({ message: "Location updated successfully" });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
