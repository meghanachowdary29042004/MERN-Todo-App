import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
const uri = process.env.MONGODB_URI;

const options = {
    serverapi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: false
    }
}
let client;
const connectToDatabase = async () => {
    if (!client) {
        try {
            client = new MongoClient(uri, options);
            console.log('Connected to the database...');
        } catch (error) {
            console.error('Error connecting to the database. \n', error);
        }
    }
    return client;
};
const getDatabase = () => client;
export { connectToDatabase, getDatabase };