export interface Recette {
    id: number;
    nom: string;
    description: string;
    image: string;
    tempsPreparation: number;
}

export interface RecetteAdd {
    nom: string;
    description: string;
    instructions: string;
    categorie: string;
    tempsPreparation: number;
    origine: string;
    ingredients: string[];
}
