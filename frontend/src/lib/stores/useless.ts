import { getIngredients } from '$lib/services/api';
import type { Ingredient } from '$lib/types/ingredients';   
import { writable } from 'svelte/store';

const initialIngredient: Ingredient[] = await getIngredients();

export const ingredients = writable<Ingredient[]>(initialIngredient);
