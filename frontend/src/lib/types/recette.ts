export interface Ingredient {
	nom: string;
	quantite: number;
	unite: string;
}

export interface Recette {
	nom: string;
	description: string;
	instructions: string;
	categorie: string;
	tempsPreparation: number;
	origine: string;
	ingredients: Ingredient[];
}
