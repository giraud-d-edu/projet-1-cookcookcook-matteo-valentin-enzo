import type { Recette, RecetteAdd } from '$lib/types/recette';
import { writable } from 'svelte/store';
import { RecetteService } from '$lib/services/recetteService';

interface RecetteState {
	recette: Recette | null;
	error: string | null;
	loading: boolean;
}

function createRecetteStore() {
	const { subscribe, set, update } = writable<RecetteState>({
		recette: null,
		error: null,
		loading: false
	});

	return {
		subscribe,
		loadRecette: async (fetch: typeof window.fetch, id: string) => {
			update((state) => ({ ...state, loading: true }));
			try {
				const recette = await RecetteService.getRecette(fetch, id);
				set({ recette, error: null, loading: false });
			} catch (e) {
				set({ recette: null, error: (e as Error).message, loading: false });
			}
		},
		reset: () => set({ recette: null, error: null, loading: false })
	};
}

export const recetteStore = createRecetteStore();

export const recettes = writable<Recette[]>([]);

export async function recetteAdd(recette: RecetteAdd): Promise<Response> {
	const response = await fetch('http://localhost:8000/recettes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(recette)
	});

	if (!response.ok) {
		throw new Error("Erreur lors de l'ajout de la recette");
	}

	return response;
}

export async function loadRecettes(fetch: typeof window.fetch) {
	const data = await RecetteService.getRecettes(fetch);
	recettes.set(data);
}
