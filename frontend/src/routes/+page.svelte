<script>
  import Card from '$lib/components/card.svelte';
  
  const produits = [
    {
      id: 1,
      titre: "Produit 1",
      description: "Description du produit 1",
      image: "https://picsum.photos/300/200?random=1"
    },
    {
      id: 2,
      titre: "Produit 2",
      description: "Description du produit 2",
      image: "https://picsum.photos/300/200?random=2"
    },
    {
      id: 3,
      titre: "Produit 3",
      description: "Description du produit 3",
      image: "https://picsum.photos/300/200?random=3"
    }
  ];
</script>

<h1>Nos produits</h1>

<div class="grid">
  {#each produits as produit}
    <Card 
      titre={produit.titre} 
      description={produit.description} 
      image={produit.image}
    >
      <svelte:fragment slot="actions">
        <a href={`/produit/${produit.id}`}>
          <button>Voir détails</button>
        </a>
      </svelte:fragment>
    </Card>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1em;
  }
</style>