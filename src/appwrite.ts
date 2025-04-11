import { Account, Client, Databases, ID } from 'appwrite';
import { User } from './DTO/UserDTO';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const VERIFICATION_URL = import.meta.env.VITE_APPWRITE_VERIFICATION_URL;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const database = new Databases(client);
export const account = new Account(client);

/**
 * create appwrite user and save new subscription to appwrite database
 */
export const createUser = async (user: User) => {
    const { firstname, lastname, password, email, phone, regions } = user;

    try {
        // create new appwrite user
        const newUser = await account.create(ID.unique(), email, password);

        await account.createEmailPasswordSession(email, password!);

        // send verification email -> TODO: rework email template
        await account.createVerification(VERIFICATION_URL);
        // create full database entry
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            userId: newUser.$id,
            firstname,
            lastname,
            phone,
            regions,
        });
        alert('Account created! Please verify your email.');
    } catch (error: any) {
        console.error('❌ Error creating subscription:', error.message || error);
        alert(error.message || error);
        throw error;
    }
};
