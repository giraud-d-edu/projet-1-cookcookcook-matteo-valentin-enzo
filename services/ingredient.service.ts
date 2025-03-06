import * as ingredientRepository from '../repositories/ingredient.repository.ts';
import { NotFoundException } from '../deps.ts';
import { Ingredient, IngredientCandidate } from './models/ingredient.model.ts';

export const getAllIngredientsService = async (): Promise<Ingredient[] | null> => {
    return await ingredientRepository.getAllIngredients();
};

export const getIngredientByIdService = async (id: string): Promise<Ingredient | null> => {
    return await ingredientRepository.getIngredientById(id);
};

export const getIngredientByNom = async (nom: string): Promise<Ingredient | null> => {
    return await ingredientRepository.getIngredientByNom(nom);
};

export const createIngredientService = async (ingredientCandidate: IngredientCandidate): Promise<Ingredient | null> => {
    return await ingredientRepository.createIngredient(ingredientCandidate);
};

export const updateIngredientService = async (ingredient: Ingredient): Promise<Ingredient | null> => {
    const idexist = getIngredientByIdService(ingredient.id);
    if (!idexist) {
        throw new NotFoundException('No id found for this ingredient');
    }
    return await ingredientRepository.updateIngredient(ingredient);
};

export const deleteIngredientService = async (id: string): Promise<boolean> => {
    return await ingredientRepository.deleteIngredient(id);
};
