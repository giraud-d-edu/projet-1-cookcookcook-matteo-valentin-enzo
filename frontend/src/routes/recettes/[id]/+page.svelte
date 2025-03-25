<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  interface Ingredient {
    nom: string;
    quantite: number;
    unite: string;
  }

  interface Recette {
    nom: string;
    description: string;
    instructions: string;
    categorie: string;
    tempsPreparation: number;
    origine: string;
    ingredients: Ingredient[];
  }
  
  // Récupérer le paramètre d'URL
  const id = $page.params.id;
  
  // État pour stocker les données de la recette
  let recette: Recette | null = null;
  let error: string | null = null;

  // Fonction pour charger les données de la recette
  async function loadRecette() {
    try {
      const response = await fetch(`http://localhost:8000/recettes/${id}`);
      if (!response.ok) {
        throw new Error('Recette non trouvée');
      }
      recette = await response.json();
    } catch (e) {
      error = (e as Error).message;
    }
  }

  // Charger les données au montage du composant
  onMount(loadRecette);

  function retourPage() {
    history.back();
  }
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

<style>
  .bouton-retour {
    position: absolute;
    top: 90px;
    left: 20px;
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: #444;
    transition: background-color 0.2s;
  }

  .bouton-retour:hover {
    background-color: #e0e0e0;
  }

  .recette-details {
    margin-top: 120px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }

  .meta-info {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
  }

  .ingredients ul {
    list-style-type: none;
    padding: 0;
  }

  .ingredients li {
    padding: 5px 0;
  }

  .error {
    color: red;
    padding: 20px;
    text-align: center;
  }

  .loading {
    text-align: center;
    padding: 20px;
  }

  .recette-header {
    margin-bottom: 20px;
  }

  .recette-header h1 {
    margin-bottom: 8px;
  }

  .description-courte {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
    line-height: 1.4;
  }

  .etapes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .etape {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .etape:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .numero {
    font-weight: bold;
    color: #444;
    font-size: 1.1rem;
  }

  .texte {
    margin: 0;
    padding-left: 1rem;
  }
</style>