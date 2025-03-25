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

export async function loadRecette(
	id: string
): Promise<{ recette: Recette | null; error: string | null }> {
	try {
		const response = await fetch(`http://localhost:8000/recettes/${id}`);
		if (!response.ok) {
			throw new Error('Recette non trouvée');
		}
		const recette = await response.json();
		return { recette, error: null };
	} catch (e) {
		return { recette: null, error: (e as Error).message };
	}
}

export function retourPage(): void {
	history.back();
}
