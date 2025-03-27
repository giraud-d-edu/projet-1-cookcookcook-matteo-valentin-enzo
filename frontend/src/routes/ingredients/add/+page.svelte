<script lang="ts">
    import { goto } from '$app/navigation';
    import { IngredientService } from '$lib/services/ingredientService';
    import type { Ingredient } from '$lib/types/ingredient';

    let nom = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        if (!nom.trim()) {
            error = 'Le nom de l\'ingrédient est requis';
            return;
        }

        loading = true;
        error = '';

        try {
            await IngredientService.createIngredient(fetch, { nom: nom.trim() });
            goto('/ingredients');
        } catch (e) {
            error = 'Une erreur est survenue lors de la création de l\'ingrédient';
        } finally {
            loading = false;
        }
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Ajouter un ingrédient</h1>

    <form on:submit|preventDefault={handleSubmit} class="max-w-md">
        <div class="mb-4">
            <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom de l'ingrédient</label>
            <input
                type="text"
                id="nom"
                bind:value={nom}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Tomate"
            />
        </div>

        {#if error}
            <div class="text-red-500 text-sm mb-4">{error}</div>
        {/if}

        <div class="flex gap-4">
            <button
                type="submit"
                disabled={loading}
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {loading ? 'Création en cours...' : 'Créer l\'ingrédient'}
            </button>
            <a
                href="/ingredients"
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                Annuler
            </a>
        </div>
    </form>
</div>
