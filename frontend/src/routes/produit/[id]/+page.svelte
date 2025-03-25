<script>
  import { page } from '$app/stores';
  
  // Récupérer le paramètre d'URL
  const id = $page.params.id;
</script>

<h1>Détails du produit {id}</h1>
<p>Cette page affiche les détails du produit avec l'ID {id}.</p>