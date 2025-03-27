<script lang="ts">
    export let recette;
    export let ingredients: string;
    import '../../styles/Form.scss';
</script>

<div>
    <label for="nom">Titre de la recette</label>
    <input type="text" id="nom" bind:value={recette.nom} placeholder="Entrez le titre" required />
</div>

<div>
    <label for="description">Description</label>
    <textarea id="description" bind:value={recette.description} placeholder="Entrez une description" required
    ></textarea>
</div>

<div>
    <label for="instructions">Instructions</label>
    <textarea id="instructions" bind:value={recette.instructions} placeholder="Décrivez les étapes" required></textarea>
</div>

<div>
    <label for="categorie">Catégorie</label>
    <input type="text" id="categorie" bind:value={recette.categorie} placeholder="Entrez la catégorie" required />
</div>

<div>
    <label for="cookingTime">Temps de préparation (min)</label>
    <input type="number" id="cookingTime" bind:value={recette.tempsPreparation} required />
</div>

<div>
    <label for="origine">Origine</label>
    <input type="text" id="origine" bind:value={recette.origine} placeholder="Entrez l'origine" required />
</div>

<div>
    <label for="ingredients">Ingrédients</label>
    <textarea id="ingredients" bind:value={ingredients} placeholder="Ingrédients séparés par des virgules"></textarea>
</div>

<div class="actions">
    <slot name="actions">
        <button type="submit">Valider</button>
    </slot>
</div>
