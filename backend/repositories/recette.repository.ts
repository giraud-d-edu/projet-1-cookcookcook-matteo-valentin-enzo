import { Recette, RecetteCandidate } from '../services/models/recette.model.ts';
import { getRecettesCollection } from './mongo.ts';
import { ObjectId, NotFoundException } from '../deps.ts';
import { RecetteDbo, fromRecetteDboToRecette } from './dbos/recette.dbo.ts';

export const getAllRecettes = async (): Promise<Recette[]> => {
    const recettesCollection = getRecettesCollection();
    const dbos = await recettesCollection.find({}).toArray();
    return dbos.map((dbo: RecetteDbo) => fromRecetteDboToRecette(dbo));
};

export const getRecetteById = async (id: string): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const objectId = new ObjectId(id);
    const dbo = await recettesCollection.findOne({ _id: objectId });
    if (!dbo) {
        throw new NotFoundException('Recette not found');
    }
    return fromRecetteDboToRecette(dbo);
};

export const getRecetteByNom = async (nom: string): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const dbo = await recettesCollection.findOne({ nom: { $regex: new RegExp(`^${nom}$`, 'i') } });
    if (!dbo) {
        throw new NotFoundException('Ingredient not found');
    }
    return fromRecetteDboToRecette(dbo);
};

export const getRecetteByCategorie = async (categorie: 'entrée' | 'plat' | 'dessert' | 'autre'): Promise<Recette[]> => {
    const ingredientsCollection = getRecettesCollection();
    const dbos = await ingredientsCollection
        .find({ categorie: { $regex: new RegExp(`^${categorie}$`, 'i') } })
        .toArray();
    if (!dbos || dbos.length === 0) {
        throw new NotFoundException('Ingredient not found');
    }
    return dbos.map((dbo: RecetteDbo) => fromRecetteDboToRecette(dbo));
};

export const createRecette = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const insertId = await recettesCollection.insertOne({
        ...recetteCandidate,
        ingredients: recetteCandidate.ingredients.map((candidate) => ({
            ...candidate,
            id: new ObjectId().toString(),
        })),
    });

    return await getRecetteById(insertId.toString());
};

export const updateRecette = async (updatedRecetteData: Recette): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const objectId = new ObjectId(updatedRecetteData.id);
    await recettesCollection.updateOne(
        { _id: objectId },
        {
            $set: updatedRecetteData,
        },
    );
    return await getRecetteById(updatedRecetteData.id.toString());
};

export const deleteRecette = async (id: string): Promise<void> => {
    try {
        const recettesCollection = getRecettesCollection();
        const objectId = new ObjectId(id);
        await recettesCollection.deleteOne({ _id: objectId });
    } catch (error) {
        throw new NotFoundException('Recette not found'); // TODO: change to internal server error
    }
};
