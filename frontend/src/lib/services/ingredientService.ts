import type { Ingredient } from '$lib/types/ingredient';
import { config } from '$lib/config/config';

export async function getIngredients(): Promise<Ingredient[]> {
    const response = await fetch(`${config.API_URL}/ingredients`);
    return response.json();
}
