import { getRecettes, addRecette } from '$lib/services/recetteService';
import type { Recette, RecetteAdd } from '$lib/types/recettes';
import { writable } from 'svelte/store';

const initialRecette: Recette[] = await getRecettes();

export const recettes = writable<Recette[]>(initialRecette);

export async function recetteAdd(recette: RecetteAdd) {
	console.log(recette);
	return addRecette(recette);
}
