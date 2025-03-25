<script>
  export let nom = "nom de la recette";
  export let description = "Description par défaut";
  export let image = "";
</script>

<div class="card">
  {#if image}
    <img src={image} alt={nom} />
  {/if}
  <div class="content">
    <h2>{nom}</h2>
    <p>{description}</p>
  </div>
</div>

<style>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  .content {
    padding: 1em;
  }
  
  h2 {
    margin-top: 0;
  }
  
  .actions {
    margin-top: 1em;
  }
</style>