import { Recette, RecetteCandidate } from '../services/models/recette.model.ts';
import { getRecettesCollection } from './mongo.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.34.0/mod.ts';
import { NotFoundException } from '../utils/exceptions.ts';
import { fromRecetteDboToRecette } from './dbos/recette.dbo.ts';

export const getAllRecettes = async (): Promise<Recette[]> => {
    const recettesCollection = getRecettesCollection();
    const dbos = await recettesCollection.find({}).toArray();
    return dbos.map((dbo) => fromRecetteDboToRecette(dbo));
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
