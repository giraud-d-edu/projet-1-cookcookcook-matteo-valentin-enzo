<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { recetteStore } from '$lib/stores/recetteStore';
    import { retourPage } from '$lib/utils/navigation';
    import { goto } from '$app/navigation';
    import '../../../styles/RecettePage.scss';

    const id = $page.params.id;
    let isEditing = false;
    let editedRecette: any = null;

    onMount(() => {
        recetteStore.loadRecette(fetch, id);
        return () => recetteStore.reset();
    });

    function startEditing() {
        editedRecette = { ...recette };
        isEditing = true;
    }

    async function saveChanges() {
        if (confirm('Voulez-vous enregistrer les modifications ?')) {
            const success = await recetteStore.updateRecette(fetch, id, editedRecette);
            if (success) {
                isEditing = false;
            }
        }
    }

    function cancelEditing() {
        isEditing = false;
        editedRecette = null;
    }

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
        {#if recette && !isEditing}
            <div class="action-buttons">
                <button class="bouton-modifier" on:click={startEditing}> Modifier </button>
                <button class="bouton-supprimer" on:click={handleDelete}> Supprimer </button>
            </div>
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
            {#if isEditing}
                <div class="edit-form">
                    <header class="recette-header">
                        <input type="text" bind:value={editedRecette.nom} class="edit-input title" />
                        <textarea bind:value={editedRecette.description} class="edit-input description"></textarea>
                    </header>

                    <div class="meta-info">
                        <div>
                            <strong>Catégorie:</strong>
                            <input type="text" bind:value={editedRecette.categorie} class="edit-input" />
                        </div>
                        <div>
                            <strong>Origine:</strong>
                            <input type="text" bind:value={editedRecette.origine} class="edit-input" />
                        </div>
                        <div>
                            <strong>Temps de préparation:</strong>
                            <input type="number" bind:value={editedRecette.tempsPreparation} class="edit-input" /> minutes
                        </div>
                    </div>

                    <div class="ingredients">
                        <h2>Ingrédients</h2>
                        {#each editedRecette.ingredients as ingredient, i}
                            <input type="text" bind:value={ingredient.nom} class="edit-input" />
                        {/each}
                    </div>

                    <div class="instructions">
                        <h2>Instructions</h2>
                        <textarea bind:value={editedRecette.instructions} class="edit-input instructions" rows="10"
                        ></textarea>
                    </div>

                    <div class="edit-actions">
                        <button class="bouton-annuler" on:click={cancelEditing}>Annuler</button>
                        <button class="bouton-sauvegarder" on:click={saveChanges}>Sauvegarder</button>
                    </div>
                </div>
            {:else}
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
            {/if}
        </div>
    {/if}
</main>
