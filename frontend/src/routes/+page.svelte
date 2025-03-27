<script>
    import Card from '$lib/components/card.svelte';
    import { recettes } from '$lib/stores/recetteStore';
    import { timeToStringConverter } from '$lib/utils/timeConverter';
    import '../styles/Page.scss';
</script>

<h1>Nos Recettes</h1>

<div class="grid">
    {#each $recettes as recette}
        <a href={`/recettes/${recette.id}`}>
            <Card
                nom={recette.nom}
                description={recette.description}
                image="https://picsum.photos/300/200/?random={recette.id}"
                tempsPreparation={timeToStringConverter(recette.tempsPreparation)}
            ></Card>
        </a>
    {/each}
</div>
