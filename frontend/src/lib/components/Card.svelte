<script lang="ts">
    export let nom = 'nom de la recette';
    export let description = 'Description par défaut';
    export let image = '';
    export let tempsPreparation = 'Temps de préparation inconnu';
    import { onMount } from 'svelte';
    import '../../styles/Card.scss';

    let imgElement: HTMLImageElement;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible = true;
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '50px',
            },
        );

        if (imgElement) {
            observer.observe(imgElement);
        }

        return () => observer.disconnect();
    });
</script>

<div class="card">
    <div class="card__header">
        {#if image}
            <img
                bind:this={imgElement}
                src={isVisible ? image : ''}
                alt={nom}
                loading="lazy"
                width="300"
                height="200"
                style="background: #f0f0f0;"
            />
        {:else}
            <img src="/default-recipe.jpg" alt="Recette par défaut" loading="lazy" width="300" height="200" />
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
