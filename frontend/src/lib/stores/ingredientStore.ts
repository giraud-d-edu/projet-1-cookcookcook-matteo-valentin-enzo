import { IngredientService } from '$lib/services/ingredientService';
import type { Ingredient } from '$lib/types/ingredient';
import { writable, derived } from 'svelte/store';

interface IngredientState {
    ingredient: Ingredient | null;
    error: string | null;
    loading: boolean;
}

export const ingredients = writable<Ingredient[]>([]);
export const ingredientSearchQuery = writable<string>('');

export async function loadIngredients(fetch: typeof window.fetch) {
    const data = await IngredientService.getIngredients(fetch);
    ingredients.set(data);
}
export async function addIngredient(ingredient: string): Promise<Response> {
    return IngredientService.addIngredient(ingredient);
}

export async function getIngredient(name: string): Promise<Ingredient> {
    return IngredientService.getIngredientName(name).then((ingredients) => ingredients[0]);
}

// Filtrer les ingrédients en fonction de la recherche
export const filteredIngredients = derived(
    [ingredients, ingredientSearchQuery],
    ([$ingredients, $ingredientSearchQuery]) => {
        if (!$ingredientSearchQuery) return $ingredients;
        return $ingredients.filter((ingredient) =>
            ingredient.nom.toLowerCase().includes($ingredientSearchQuery.toLowerCase()),
        );
    },
);
