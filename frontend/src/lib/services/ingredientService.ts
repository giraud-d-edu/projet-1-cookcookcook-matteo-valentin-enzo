import type { Ingredient } from '$lib/types/ingredients';
const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getIngredients(): Promise<Ingredient[]> {
    const response = await fetch(`${API_BASE_URL}/ingredients`);
    return response.json();
}
