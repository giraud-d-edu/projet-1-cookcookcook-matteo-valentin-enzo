<script>
    import Card from '$lib/components/Card.svelte';
    import { onMount } from 'svelte';
    import { ingredients, loadIngredients } from '$lib/stores/ingredientStore';

    onMount(() => {
        loadIngredients(fetch);
    });
</script>

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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {#each $ingredients as ingredient}
            <a href="/ingredients/{ingredient.id}">
                <Card
                    nom={ingredient.nom}
                    image={`https://picsum.photos/300/200/?random=${ingredient.id}`}
                />
            </a>
            <p>Test</p>
        {/each}

    </div>
</div>

