import { writable } from 'svelte/store';
import type { Recette } from '$lib/types/recette';
import { getRecette } from '$lib/services/recetteService';

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
				const recette = await getRecette(fetch, id);
				set({ recette, error: null, loading: false });
			} catch (e) {
				set({ recette: null, error: (e as Error).message, loading: false });
			}
		},
		reset: () => set({ recette: null, error: null, loading: false })
	};
}

export const recetteStore = createRecetteStore();
