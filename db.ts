import {Collection, Db, MongoClient} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error("Invalid Key");
}

const DB_NAME = "Mango";

export const URL_LIST = "url_list";

let client: MongoClient | null=null;
let db: Db | null=null;

async function connect(): Promise<Db> {

    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }

    return client.db(DB_NAME);
}


export default async function getDB(cluster: string): Promise<Collection> {
    if (!db) {
        db = await connect();
    }

    return db.collection(cluster);
}