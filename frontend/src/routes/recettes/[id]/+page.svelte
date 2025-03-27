<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { recetteStore } from '$lib/stores/recetteStore';
    import { retourPage } from '$lib/services/recetteService';
    import { goto } from '$app/navigation';
    import '../../../styles/RecettePage.scss';

    const id = $page.params.id;

    onMount(() => {
        recetteStore.loadRecette(fetch, id);
        return () => recetteStore.reset();
    });

    async function handleDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            const success = await recetteStore.deleteRecette(fetch, id);
            if (success) {
                goto('/');
            }
        }
    }

    $: ({ recette, error, loading } = $recetteStore);
</script>

<main class="recette-page">
    <div class="header-actions">
        <button class="bouton-retour" on:click={retourPage}> ← Retour </button>
        {#if recette}
            <button class="bouton-supprimer" on:click={handleDelete}> Supprimer </button>
        {/if}
    </div>

    {#if loading}
        <div class="loading">
            <p>Chargement de la recette...</p>
        </div>
    {:else if error}
        <div class="error">
            <p>{error}</p>
        </div>
    {:else if recette}
        <div class="recette-details">
            <header class="recette-header">
                <h1>{recette.nom}</h1>
                <p class="description-courte">{recette.description}</p>
            </header>

            <div class="meta-info">
                <p><strong>Catégorie:</strong> {recette.categorie}</p>
                <p><strong>Origine:</strong> {recette.origine}</p>
                <p><strong>Temps de préparation:</strong> {recette.tempsPreparation} minutes</p>
            </div>

            <div class="ingredients">
                <h2>Ingrédients</h2>
                <ul>
                    {#each recette.ingredients as ingredient}
                        <li>{ingredient.nom}</li>
                    {/each}
                </ul>
            </div>

            <div class="instructions">
                <h2>Instructions</h2>
                {#if recette.instructions.includes('.')}
                    <div class="etapes">
                        {#each recette.instructions.split('\n') as etape}
                            {@const [numero, texte] = etape.split('. ')}
                            <div class="etape">
                                <span class="numero">Étape {numero}</span>
                                <p class="texte">{texte}</p>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <p>{recette.instructions}</p>
                {/if}
            </div>
        </div>
    {/if}
</main>

<style lang="scss">
    .recette-page {
        position: relative;
    }
</style>
