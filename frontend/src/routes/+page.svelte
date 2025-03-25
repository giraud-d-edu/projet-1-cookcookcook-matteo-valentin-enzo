<script>
	import Card from '$lib/components/card.svelte';
	import { recettes } from '$lib/stores/recetteStore';
  import { timeToStringConverter } from '$lib/utils/timeConverter';
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

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;
	}
  a{
    text-decoration: none;
    color: black;
  }
	a:link {
		color: black;
	}
	a:hover {
		color: gold;
	}
	a:visited {
		display: none;
	}
  a:active {
    color: red;
  }
</style>
