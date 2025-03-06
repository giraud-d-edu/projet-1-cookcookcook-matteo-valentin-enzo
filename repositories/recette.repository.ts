import { Recette, RecetteCandidate } from '../services/models/recette.model.ts';
import { getRecettesCollection } from './mongo.ts';
import { ObjectId, NotFoundException } from '../deps.ts';
import { RecetteDbo, fromRecetteDboToRecette } from './dbos/recette.dbo.ts';

export const getAllRecettes = async (ingredients?: string[]): Promise<Recette[]> => {
    const recettesCollection = getRecettesCollection();
    const query = ingredients && ingredients.length > 0 ? { ingredients: { $all: ingredients } } : {};
    const dbos = await recettesCollection.find(query).toArray();
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

export const createRecette = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const insertId = await recettesCollection.insertOne({ ...recetteCandidate });
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

export const deleteRecette = async (id: string): Promise<boolean> => {
    const recettesCollection = getRecettesCollection();
    const objectId = new ObjectId(id);
    const deleteCount = await recettesCollection.deleteOne({ _id: objectId });
    return deleteCount > 0;
};
