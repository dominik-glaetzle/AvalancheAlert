import { Account, Client, Databases, ID, Query } from 'appwrite';
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
export const createUser = async (user: User): Promise<void> => {
    const { username, password, email, phone, regions } = user;

    try {
        const newUser = await account.create(ID.unique(), email, password, username);
        await account.createEmailPasswordSession(email, password);
        await account.createVerification(VERIFICATION_URL);

        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            userId: newUser.$id,
            phone,
            regions,
        });
    } catch (error: any) {
        if (error.code === 409) {
            throw new Error('❌ Error: This email is already registered. Please log in or use another address.');
        } else {
            console.error('Error creating user: ', error.message || error);
            throw error;
        }
    }
};

/**
 * login existing user
 */
export const loginUser = async (user: User) => {
    const { email, password } = user;

    try {
        try {
            await account.deleteSessions();
        } catch (_) {}
        await account.createEmailPasswordSession(email, password);
    } catch (error: any) {
        console.error('❌ Login failed:', error.message || error);
        throw error;
    }
};

/**
 * get all subscribed regions from appwrite database
 */
export const getSubscribedRegions = async () => {
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents.flatMap((doc) => doc.regions);
    } catch (error: any) {
        console.error('❌ Error getting subscribed regions:', error.message || error);
        alert(error.message || error);
    }
};

/**
 * update subscribed regions from appwrite database
 */
export const updateSubscribedRegions = async (regionIDs: string[]) => {
    try {
        const user = await account.get();
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('userId', user.$id)]);
        if (result.documents.length === 0) {
            throw new Error('User document not found');
        }
        const docId = result.documents[0].$id;

        await database.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
            regions: regionIDs,
        });
    } catch (error: any) {
        console.error('❌ Error updating user regions:', error.message || error);
    }
};

export const getPhoneNumber = async () => {
    try {
        const currentUser = await account.get();
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('userId', currentUser.$id),
        ]);

        if (response.documents.length > 0) {
            return response.documents[0].phone;
        } else {
            console.warn('No user document found for this user');
            return null;
        }
    } catch (error: any) {
        console.error('❌ Error getting phone number:', error.message || error);
        alert(error.message || error);
        return null;
    }
};
