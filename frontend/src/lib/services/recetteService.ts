import type { Recette } from '$lib/types/recettes';
const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getRecettes(): Promise<Recette[]> {
    const response = await fetch(`${API_BASE_URL}/recettes`);
    return response.json();
}