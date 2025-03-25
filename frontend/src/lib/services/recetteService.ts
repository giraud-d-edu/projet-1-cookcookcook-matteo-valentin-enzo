import type { Recette } from '$lib/types/recette';
import { error } from '@sveltejs/kit';

export async function getRecette(fetch: typeof window.fetch, id: string): Promise<Recette> {
	const response = await fetch(`/api/recettes/${id}`);

	if (!response.ok) {
		throw error(404, 'Recette non trouvée');
	}

	return await response.json();
}

export function retourPage(): void {
	history.back();
}
