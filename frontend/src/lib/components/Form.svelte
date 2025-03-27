<script lang="ts">
    import { writable } from 'svelte/store';
    export let recette;
    export let ingredients = writable('');
    import '../../styles/Form.scss';
    let categories = [
    'Entrée',
    'Plat',
    'Dessert',
    'Autre'
  ]
  let Origine = [
    'France',
    'Italie',
    'Espagne',
    'Allemagne',
    'Angleterre',
    'Portugal',
    'Mexique',
    'Brésil',
    'Chine',
    'Japon',
    'Inde',
    'Autre'
  ];

</script>

<div class="form-row">
    <div class="form-group">
        <input type="text" id="nom" bind:value={recette.nom} minlength="5" maxlength="100" placeholder="Entrez le titre" required />
        <label for="nom">Titre de la recette</label>
    </div>

    <div class="form-group">     
    <select id="categorie" bind:value={recette.categorie} required>
        {#each categories as categorie}
        <option value={categorie}>{categorie}</option>
        {/each}
    </select>
    <label for="categorie">Catégorie</label>
    </div>
</div>

<div class="form-group">
    <textarea id="description" bind:value={recette.description} minlength="1" maxlength="500" placeholder="Entrez une description" required></textarea>
    <label for="description">Description</label>
</div>

<div class="form-group">
    <label for="instructions">Instructions</label>
    <p>Décrivez les étapes(une étape = UNE ligne)</p>
    <textarea id="instructions" bind:value={recette.instructions} maxlength="1000" placeholder="exemple: Coupez les pommes de terres.
Assaisonner le tout." required></textarea>
</div>

<div class="form-row">
    <div class="form-group">
        <input type="number"
            id="tempsPreparation"
            bind:value={recette.tempsPreparation}
            placeholder="Temps de préparation en minutes"
            required
        />
        <label for="tempsPreparation">Temps de préparation (minutes)</label>
    </div>

    <div class="form-group">
        <label for="origine">Origine</label>
        <select id="origine" bind:value={recette.origine} required>
            {#each Origine as origine}
            <option value={origine}>{origine}</option>
            {/each}
        </select>
    </div>
</div>

<div class="form-group">
    <textarea id="ingredients" bind:value={ingredients} minlength="2" placeholder="Entrez un ingrédient" required></textarea>
    <label for="ingredients">Ingrédients</label>
</div>

<div class="actions">
    <slot name="actions">
        <button type="submit">Valider</button>
        <button type="button">Annuler</button>
    </slot>
</div>
