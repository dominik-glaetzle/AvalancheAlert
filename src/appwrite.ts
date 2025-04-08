import { Client, Databases, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;



const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

interface SubscriptionData {
    email?: string;
    phone?: string;
    regions: string[];
}

/**
 * Save new subscription to appwrite database
 */
export const saveSubscription = async (data: SubscriptionData) => {
    const { email, phone, regions } = data;

    if (!email && !phone) {
        throw new Error('Please provide at least an email or phone number.');
    }

    try {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    email,
                    phone,
                    regions,
                }
            );
    } catch (error: any) {
        console.error('❌ Error saving subscription:', error.message || error);
        alert(error.message || error);
        throw error;
    }
};