import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchEventStats = async () => {
    try {
        const statsRef = doc(db, "event_stats", "marketing_overview");
        const statsDoc = await getDoc(statsRef);
        if (statsDoc.exists()) {
            return statsDoc.data();
        }
        return null; // Return null if stats don't exist yet
    } catch (error) {
        console.error("Error fetching event stats:", error);
        return null;
    }
};
