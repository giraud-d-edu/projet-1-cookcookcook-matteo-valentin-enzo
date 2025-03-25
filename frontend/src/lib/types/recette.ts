import type { Ingredient } from './ingredients';

export interface Recette {
	nom: string;
	description: string;
	instructions: string;
	categorie: string;
	tempsPreparation: number;
	origine: string;
	ingredients: Ingredient[];
}
