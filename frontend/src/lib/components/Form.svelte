<script lang="ts">
    export let recette;
    export let ingredients: string;
    import '../../styles/Form.scss';
</script>

<form class="form-container">
    <div class="form-row">
        <div class="form-group">
            <input type="text" id="nom" bind:value={recette.nom} placeholder="Entrez le titre" required />
            <label for="nom">Titre de la recette</label>
        </div>

        <div class="form-group">
            <input
                type="text"
                id="categorie"
                bind:value={recette.categorie}
                placeholder="Entrez la catégorie"
                required
            />
            <label for="categorie">Catégorie</label>
        </div>
    </div>

    <div class="form-group">
        <textarea id="description" bind:value={recette.description} placeholder="Entrez une description" required
        ></textarea>
        <label for="description">Description</label>
    </div>

    <div class="form-group">
        <textarea id="instructions" bind:value={recette.instructions} placeholder="Décrivez les étapes" required
        ></textarea>
        <label for="instructions">Instructions</label>
    </div>

    <div class="form-row">
        <div class="form-group">
            <input
                type="number"
                id="tempsPreparation"
                bind:value={recette.tempsPreparation}
                placeholder="Temps en minutes"
                required
            />
            <label for="tempsPreparation">Temps de préparation (min)</label>
        </div>

        <div class="form-group">
            <input type="text" id="origine" bind:value={recette.origine} placeholder="Entrez l'origine" required />
            <label for="origine">Origine</label>
        </div>
    </div>

    <div class="form-group">
        <textarea id="ingredients" bind:value={ingredients} placeholder="Ingrédients séparés par des virgules"
        ></textarea>
        <label for="ingredients">Ingrédients</label>
    </div>

    <div class="actions">
        <slot name="actions">
            <button type="submit">Valider</button>
            <button type="button">Annuler</button>
        </slot>
    </div>
</form>
