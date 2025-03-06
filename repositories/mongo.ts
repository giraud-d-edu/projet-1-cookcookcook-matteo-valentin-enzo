import { MongoClient, Database } from '../deps.ts';
import { IngredientDBO } from './dbos/ingredient.dbo.ts';
import { RecetteDBO } from './dbos/recette.dbo.ts';

const MONGO_URI = Deno.env.get('MONGO_URI') || 'mongodb://127.0.0.1:27017';
const DB_NAME = Deno.env.get('DB_NAME') || 'project-1-cook-mongodb';

let client: MongoClient | null = null;
let db: Database | null = null;

export async function connectDB(): Promise<Database> {
    if (db) {
        return db;
    }
    client = new MongoClient();
    try {
        await client.connect(MONGO_URI);
        db = client.database(DB_NAME);
        console.log('Connecté à MongoDB ! Base de données:', DB_NAME);
        return db;
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        Deno.exit(1);
    }
}

export function getIngredientCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    return db.collection<IngredientDBO>('ingredients');
}

export function getRecetteCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    return db.collection<RecetteDBO>('recettes');
}
