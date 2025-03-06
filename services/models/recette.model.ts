import { Ingredient } from './ingredient.model.ts';
export interface Recette {
    id: string;
    nom: string;
    description: string;
    instructions: string;
    categorie: "entrée" | "plat" | "dessert" | "autre";
    tempsPreparation: number;
    origine: string;
    ingredients: Ingredient[];
    }