import { db } from "@/lib/firebase";
import { doc, collection, serverTimestamp, increment, writeBatch, addDoc } from "firebase/firestore";

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
 * Uses writeBatch and increment logic to avoid transaction contention on the stats document.
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
        const batch = writeBatch(db);

        // 1. Create a reference for the new registration document
        const newRegRef = doc(collection(db, eventCollection));
        batch.set(newRegRef, data);

        // 2. Update stats using increment (atomic, no read-lock needed)
        const statsRef = doc(db, "event_stats", "marketing_overview");

        // Use dot notation for nested updates to ensure we don't overwrite other fields
        // and handle atomic increments efficiently
        const statsUpdate: any = {
            total_revenue: increment(data.amount),
            total_registrations: increment(1),
            last_updated: serverTimestamp()
        };

        // Add nested updates dynamically
        statsUpdate[`${eventKey}.revenue`] = increment(data.amount);
        statsUpdate[`${eventKey}.count`] = increment(1);

        // Use set with merge: true to handle case where stats doc might not exist yet
        // or to merge with existing data without overwriting
        batch.set(statsRef, statsUpdate, { merge: true });

        await batch.commit();

        console.log(`Registration saved to ${eventCollection} and stats updated.`);
        return true;
    } catch (error) {
        console.error("Batch write failed: ", error);
        throw error;
    }
}

/**
 * Saves re-registration data to a dedicated "re_registrations" collection.
 * This does NOT update the main event stats or mix with paid registrations.
 */
export async function saveReRegistration(data: any) {
    const collectionName = "re_registrations";

    // Prepare the document data with timestamp
    const regData = {
        ...data,
        paymentStatus: 'skipped', // Explicitly mark as skipped/free
        reRegistration: true,
        createdAt: serverTimestamp(),
    };

    try {
        const docRef = await addDoc(collection(db, collectionName), regData);
        console.log(`Re-registration saved to ${collectionName} with ID: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.error("Error saving re-registration: ", error);
        throw error;
    }
}
