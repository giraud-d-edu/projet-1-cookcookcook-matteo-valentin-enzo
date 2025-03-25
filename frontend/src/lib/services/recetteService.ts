import type { Recette } from '$lib/types/recette';
import { error } from '@sveltejs/kit';

<<<<<<< HEAD
const API_URL = 'http://localhost:8000';
const DEFAULT_IMAGE = `https://picsum.photos/300/200?random=1`;

export class RecetteService {
	// Obtenir l'URL de l'image par défaut
	static getDefaultImageUrl(): string {
		return DEFAULT_IMAGE;
	}

	// Récupérer une recette par son ID
	static async getRecette(fetch: typeof window.fetch, id: string): Promise<Recette> {
		const response = await fetch(`${API_URL}/recettes/${id}`);

		if (!response.ok) {
			throw error(404, 'Recette non trouvée');
		}

		const recette = await response.json();
		recette.image = recette.image || DEFAULT_IMAGE;
		return recette;
	}

	// Rechercher des recettes avec un terme de recherche optionnel
	static async getRecettes(fetch: typeof window.fetch, query: string = ''): Promise<Recette[]> {
		try {
			const url = query
				? `${API_URL}/recettes/search?q=${encodeURIComponent(query)}`
				: `${API_URL}/recettes`;

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Erreur lors de la récupération des recettes');
			}

			const data = await response.json();
			// Ajouter l'image par défaut aux recettes qui n'en ont pas
			return (Array.isArray(data) ? data : []).map((recette) => ({
				...recette,
				image: recette.image || DEFAULT_IMAGE
			}));
		} catch (error) {
			console.error('Erreur lors de la récupération des recettes:', error);
			return [];
		}
	}

	// Rechercher des recettes par nom
	static async searchRecettes(fetch: typeof window.fetch, query: string): Promise<Recette[]> {
		try {
			const response = await fetch(`${API_URL}/recettes?nom=${encodeURIComponent(query)}`);
			if (!response.ok) {
				throw new Error('Erreur lors de la recherche des recettes');
			}
			return await response.json();
		} catch (error) {
			console.error('Erreur dans searchRecettes:', error);
			throw error;
		}
	}
}

// Fonction utilitaire pour la navigation
=======
const API_URL = import.meta.env.VITE_API_URL;

export async function getRecette(fetch: typeof window.fetch, id: string): Promise<Recette> {
	const response = await fetch(`${API_URL}/recettes/${id}`);

	if (!response.ok) {
		throw error(404, 'Recette non trouvée');
	}

	return await response.json();
}

>>>>>>> origin
export function retourPage(): void {
	history.back();
}
