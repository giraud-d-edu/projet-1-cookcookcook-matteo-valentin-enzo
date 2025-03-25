import type { Recette, RecetteAdd } from '$lib/types/recettes';
const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getRecettes(): Promise<Recette[]> {
	const response = await fetch(`${API_BASE_URL}/recettes`);
	return response.json();
}
export async function addRecette(recette: RecetteAdd) {
	try {
		const response = await fetch(`${API_BASE_URL}/recettes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recette)
		});

		if (!response.ok) {
			throw new Error(`Erreur API : ${response.statusText}`);
		}

		const data = await response.json();
		console.log('Recette ajoutée avec succès:', data);
		return data; // si tu veux utiliser la réponse après
	} catch (error) {
		console.error("Erreur lors de l'ajout de la recette:", error);
		throw error; // optionnel : propager l'erreur pour la gérer dans la page
	}
}
