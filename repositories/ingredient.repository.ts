import { Ingredient, IngredientCandidate } from '../services/models/ingredient.model.ts';
import { getIngredientsCollection } from './mongo.ts';
import { NotFoundException, ObjectId } from '../deps.ts';
import { fromIngredientDboToIngredient, IngredientDbo } from './dbos/ingredient.dbo.ts';

export const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredientsCollection = getIngredientsCollection();
    const dbos = await ingredientsCollection.find({}).toArray();
    if (dbos.length === 0) {
        throw new NotFoundException('No ingredients received');
    }
    return dbos.map((dbo: IngredientDbo) => fromIngredientDboToIngredient(dbo));
};

export const getIngredientById = async (id: string): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const objectId = new ObjectId(id);
    const dbo = await ingredientsCollection.findOne({ _id: objectId });
    if (!dbo) {
        throw new NotFoundException('Ingredient not found');
    }
    return fromIngredientDboToIngredient(dbo);
};

export const getIngredientByNom = async (nom: string): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const dbo = await ingredientsCollection.findOne({ nom: { $regex: new RegExp(`^${nom}$`, 'i') } });
    if (!dbo) {
        throw new NotFoundException('Ingredient not found');
    }
    return fromIngredientDboToIngredient(dbo);
};

export const createIngredient = async (ingredientCandidate: IngredientCandidate): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const insertId = await ingredientsCollection.insertOne({ ...ingredientCandidate });
    return await getIngredientById(insertId.toString());
};

export const updateIngredient = async (updatedIngredientData: Ingredient): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const objectId = new ObjectId(updatedIngredientData.id);
    await ingredientsCollection.updateOne(
        { _id: objectId },
        {
            $set: updatedIngredientData,
        },
    );
    return await getIngredientById(updatedIngredientData.id.toString());
};

export const deleteIngredient = async (id: string): Promise<boolean> => {
    const ingredientsCollection = getIngredientsCollection();
    const objectId = new ObjectId(id);
    const deleteCount = await ingredientsCollection.deleteOne({ _id: objectId });
    return deleteCount > 0;
};
