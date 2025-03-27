import { getIngredients } from '$lib/services/ingredientService';
import type { Ingredient } from '$lib/types/ingredients';
import { writable, derived } from 'svelte/store';

export const ingredients = writable<Ingredient[]>([]);
export const ingredientSearchQuery = writable<string>('');

export async function loadIngredients() {
    const data = await getIngredients();
    ingredients.set(data);
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

loadIngredients();
