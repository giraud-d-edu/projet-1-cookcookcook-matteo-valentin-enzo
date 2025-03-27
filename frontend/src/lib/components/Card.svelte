<script lang="ts">
    export let nom = 'nom de la recette';
    export let description = 'Description par défaut';
    export let image = '';
    export let tempsPreparation = 'Temps de préparation inconnu';
    import '../../styles/Card.scss';
</script>

<div class="card">
    <div class="card__header">
        {#if image}
            <img src={image} alt={nom} />
        {:else}
            <img src="/default-recipe.jpg" alt="Image par défaut" />
        {/if}
    </div>
    <div class="card__body">
        <h2>{nom}</h2>
        <p>{description.length > 85 ? description.slice(0, 85) + '...' : description}</p>
        <p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
            {tempsPreparation}
        </p>
    </div>
</div>
