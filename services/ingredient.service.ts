import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import { Ingredient, IngredientCandidate } from "./models/ingredient.model.ts";

export const getAllIngredientsService = async (): Promise<Ingredient[]> => {
    return await ingredientRepository.getAllIngredients();
};

export const getIngredientByIdService = async (id: string): Promise<Ingredient> => {
    return await ingredientRepository.getIngredientById(id);
};

export const createIngredientService = async (ingredientCandidate: IngredientCandidate): Promise<Ingredient> => {
    return await ingredientRepository.createIngredient(ingredientCandidate);
};

export const updateIngredientService = async (ingredient: Ingredient): Promise<Ingredient> => {
    //todo
    return await ingredientRepository.updateIngredient(ingredient);

};

export const deleteIngredientService = async (id: string): Promise<boolean> => {
    return await ingredientRepository.deleteIngredient(id);
};