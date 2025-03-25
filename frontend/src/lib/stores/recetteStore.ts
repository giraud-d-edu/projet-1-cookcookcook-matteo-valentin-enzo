import { getRecettes } from "$lib/services/recetteService";
import type { Recette } from "$lib/types/recettes";
import { writable } from "svelte/store";

const initialRecette: Recette[] = await getRecettes();

export const recettes = writable<Recette[]>(initialRecette);
