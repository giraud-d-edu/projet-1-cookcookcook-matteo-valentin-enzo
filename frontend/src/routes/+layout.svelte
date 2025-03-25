<script lang="ts">
  import NavBar from '$lib/components/navbar.svelte';
</script>

<NavBar />

<main>
  <slot />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
  }

  :global(main) {
    margin-top: 80px;
    padding: 20px;
  }

  nav {
    background-color: #f5f5f5;
    padding: 1em;
  }
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-right: 1em;
  }
  
  .active {
    font-weight: bold;
  }
</style>