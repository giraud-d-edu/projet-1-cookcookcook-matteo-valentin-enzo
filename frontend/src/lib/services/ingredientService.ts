import type { Ingredient } from '$lib/types/ingredient';
import { config } from '$lib/config/config';

export class IngredientService {
    static async getIngredients(fetch: typeof window.fetch): Promise<Ingredient[]> {
        const response = await fetch(`${config.API_URL}/ingredients`);
        return response.json();
    }
}
