<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { loadRecette, type Recette } from './recetteStore';
  import { retourPage } from './recetteStore';
  import './styles.css';

  const id = $page.params.id;
  let recette: Recette | null = null;
  let error: string | null = null;

  onMount(async () => {
    const result = await loadRecette(id);
    recette = result.recette;
    error = result.error;
  });
</script>

<main>
  <button class="bouton-retour" on:click={retourPage}>
    ← Retour
  </button>

  {#if error}
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
  {:else}
    <div class="loading">
      <p>Chargement de la recette...</p>
    </div>
  {/if}
</main>