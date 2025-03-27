import type { Ingredient } from '$lib/types/ingredient';
import { config } from '$lib/config/config';

export class IngredientService {
    static async getIngredients(fetch: typeof window.fetch): Promise<Ingredient[]> {
        const response = await fetch(`${config.API_URL}/ingredients`);
        return response.json();
    }

    static async getIngredientsByName(fetch: typeof window.fetch, name: string): Promise<Ingredient[]> {
        const response = await fetch(`${config.API_URL}/ingredients/nom/${name}`);
        return response.json();
    }

    static async createIngredient(fetch: typeof window.fetch, ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> {
        const response = await fetch(`${config.API_URL}/ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.json();
    }

    static async updateIngredient(
        fetch: typeof window.fetch,
        id: number,
        ingredient: Partial<Ingredient>,
    ): Promise<Ingredient> {
        const response = await fetch(`${config.API_URL}/ingredients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.json();
    }

    static async deleteIngredient(fetch: typeof window.fetch, id: number): Promise<void> {
        await fetch(`${config.API_URL}/ingredients/${id}`, {
            method: 'DELETE',
        });
    }
}
