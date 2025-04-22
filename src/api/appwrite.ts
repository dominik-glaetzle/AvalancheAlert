import { Account, Client, Databases, ID } from 'appwrite';
import { User } from '../DTO/UserDTO.ts';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const VERIFICATION_URL = import.meta.env.VITE_APPWRITE_VERIFICATION_URL;

const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);
export const account = new Account(client);

/**
 * create appwrite user and save new subscription to appwrite database
 */
export const createUser = async (user: User) => {
    const { username, password, email, phone, regions } = user;

    try {
        try {
            await account.deleteSessions();
        } catch (_) {}

        const newUser = await account.create(ID.unique(), email, password, username);
        await account.createEmailPasswordSession(email, password);
        await account.createVerification(VERIFICATION_URL);

        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            userId: newUser.$id,
            username,
            phone,
            regions,
        });
    } catch (error: any) {
        console.error('❌ Error creating subscription:', error.message || error);
        alert(error.message || error);
        throw error;
    }
};

export const getSubscribedRegions = async () => {
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents.flatMap((doc) => doc.regions);
    } catch (error: any) {
        console.error('❌ Error getting subscribed regions:', error.message || error);
        alert(error.message || error);
    }
};
