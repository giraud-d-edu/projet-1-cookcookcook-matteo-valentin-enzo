<<<<<<< HEAD
export interface Recette {
	id: string;
	nom: string;
	description: string;
	image?: string;
	ingredients: string[];
	instructions: string;
	tempsPreparation: number;
	categorie: string;
	origine: string;
}
export interface RecetteAdd {
=======
import type { Ingredient } from './ingredients';

export interface Recette {
>>>>>>> origin
	nom: string;
	description: string;
	instructions: string;
	categorie: string;
	tempsPreparation: number;
	origine: string;
<<<<<<< HEAD
	ingredients: string[];
=======
	ingredients: Ingredient[];
>>>>>>> origin
}
