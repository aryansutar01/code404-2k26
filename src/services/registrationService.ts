import { db } from "@/lib/firebase";
import { doc, runTransaction, serverTimestamp, collection } from "firebase/firestore";

// Helper to get collection name based on event
export const getEventCollectionName = (eventName: string) => {
    switch (eventName) {
        case "Avatar: The Algo War": return "registrations_algo_war";
        case "Neural Link": return "registrations_neural_link";
        case "The Voice of Eywa": return "registrations_voice_of_eywa";
        default: return "registrations_others";
    }
};

// Helper to get event key for stats
const getEventStatsKey = (eventName: string) => {
    switch (eventName) {
        case "Avatar: The Algo War": return "algo_war";
        case "Neural Link": return "neural_link";
        case "The Voice of Eywa": return "voice_of_eywa";
        default: return "others";
    }
};

export interface RegistrationData {
    name: string;
    email: string;
    phone: string;
    prn: string;
    department: string;
    year: string;
    eventName: string;
    amount: number;
    paymentId: string;
    orderId: string;
    signature: string;
    category?: string;
    partnerName?: string;
    partnerEmail?: string;
    partnerPhone?: string;
    [key: string]: any;
}

/**
 * Saves registration data to the specific event collection and updates global stats atomically.
 */
export async function saveRegistration(minData: RegistrationData) {
    const eventCollection = getEventCollectionName(minData.eventName);
    const eventKey = getEventStatsKey(minData.eventName);

    // Prepare the document data with timestamp
    const data = {
        ...minData,
        paymentStatus: 'success',
        createdAt: serverTimestamp(),
    };

    try {
        await runTransaction(db, async (transaction) => {
            // 1. Create a reference for the new registration document
            const newRegRef = doc(collection(db, eventCollection));

            // 2. Create a reference for the stats document
            const statsRef = doc(db, "event_stats", "marketing_overview");
            const statsDoc = await transaction.get(statsRef);

            // 3. Initialize stats if they don't exist
            let currentStats = statsDoc.exists() ? statsDoc.data() : {
                total_revenue: 0,
                total_registrations: 0,
                algo_war: { revenue: 0, count: 0 },
                neural_link: { revenue: 0, count: 0 },
                voice_of_eywa: { revenue: 0, count: 0 },
                others: { revenue: 0, count: 0 }
            };

            // 4. Update Stats Logic
            const newRevenue = (currentStats.total_revenue || 0) + data.amount;
            const newCount = (currentStats.total_registrations || 0) + 1;

            const eventStats = currentStats[eventKey] || { revenue: 0, count: 0 };
            const newEventRevenue = (eventStats.revenue || 0) + data.amount;
            const newEventCount = (eventStats.count || 0) + 1;

            // 5. Writes
            // Save the registration
            transaction.set(newRegRef, data);

            // Update the stats
            transaction.set(statsRef, {
                ...currentStats,
                total_revenue: newRevenue,
                total_registrations: newCount,
                [eventKey]: {
                    revenue: newEventRevenue,
                    count: newEventCount
                },
                last_updated: serverTimestamp()
            }, { merge: true });
        });

        console.log(`Registration saved to ${eventCollection} and stats updated.`);
        return true;
    } catch (error) {
        console.error("Transaction failed: ", error);
        throw error;
    }
}
