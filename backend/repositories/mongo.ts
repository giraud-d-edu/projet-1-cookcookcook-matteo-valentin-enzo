import { MongoClient, Database } from '../deps.ts';
import { IngredientDbo } from './dbos/ingredient.dbo.ts';
import { RecetteDbo } from './dbos/recette.dbo.ts';

const MONGO_URI = Deno.env.get('MONGO_URL') || 'mongodb://127.0.0.1:27017';
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

export function getIngredientsCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    if (!db.collection<IngredientDbo>('ingredients').find()) {
        throw { status: 500, message: 'No database with this name existing' };
    }
    return db.collection<IngredientDbo>('ingredients');
}

export function getRecettesCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    if (!db.collection<RecetteDbo>('recettes').find()) {
        throw { status: 500, message: 'No database with this name existing' };
    }
    return db.collection<RecetteDbo>('recettes');
}
