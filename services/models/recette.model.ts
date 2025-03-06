import { Ingredient, IngredientCandidate } from './ingredient.model.ts';
export interface Recette {
    id: string;
    nom: string;
    description: string;
    instructions: string;
    categorie: 'entrée' | 'plat' | 'dessert' | 'autre';
    tempsPreparation: number;
    origine: string;
    ingredients: Ingredient[];
}

export interface RecetteCandidate {
    nom: string;
    description: string;
    instructions: string;
    categorie: "entrée" | "plat" | "dessert" | "autre";
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientCandidate[];
}
