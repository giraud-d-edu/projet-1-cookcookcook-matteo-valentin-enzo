<script>
    import Card from '$lib/components/Card.svelte';
    import { onMount } from 'svelte';
    import { ingredients, loadIngredients, ingredientSearchQuery } from '$lib/stores/ingredientStore';

    onMount(() => {
        loadIngredients(fetch);
    });
</script>

<div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Liste des ingrédients</h1>
        <a
            href="/ingredients/add"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <button>Ajouter un ingrédient</button>
        </a>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingrédient</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#each $ingredients as ingredient}
                    <tr class="hover:bg-gray-50">                        
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="/ingredients/{ingredient.id}">
                                <Card
                                    nom={ingredient.nom}
                                    image={`https://picsum.photos/300/200/?random=${ingredient.id}`}
                                />
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
