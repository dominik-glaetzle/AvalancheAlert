import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

interface SubscriptionData {
    email?: string;
    phone?: string;
    regions: string[];
}

/**
 * Save new subsription to appwrite database
 */
export const saveSubscription = async (data: SubscriptionData) => {
    const { email, phone, regions } = data;

    if (!email && !phone) {
        throw new Error('Please provide at least an email or phone number.');
    }

    try {
        const response = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            ID.unique(),
            {
                email,
                phone,
                regions,
            }
        );
        console.log('✅ Subscription saved:', response);
        return response;
    } catch (error: any) {
        console.error('❌ Error saving subscription:', error.message || error);
        throw error;
    }
};