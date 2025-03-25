<script lang="ts">
  import Form from "$lib/components/form.svelte";
  import { recetteAdd } from "$lib/stores/recetteStore";
  import type { RecetteAdd } from "$lib/types/recette";

  let recette: RecetteAdd = {
    nom: '',
    description: '',
    ingredients: [],
    instructions: '',
    tempsPreparation: 0,
    categorie: '',
    origine: ''
  };

  let ingredients = '';

  const handleSubmit = async () => {

    // recette.ingredients = ingredients.split(',').map((i: string) => i.trim());
    console.log('Recette envoyée:', recette);
     try {
    const response = await recetteAdd(recette);
    console.log('API Response:', response);
    window.location.href = '/';
  } catch (err) {
    console.error('Erreur lors de l\'envoi:', err);
  }
};
</script>

<h2>Ajouter une recette</h2>
<form on:submit|preventDefault={handleSubmit} class="recette-form">
  <Form bind:recette bind:ingredients />
</form>


<style>
    .recette-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
        margin: auto;
    }

</style>