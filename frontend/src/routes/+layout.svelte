<script>
  import { page } from '$app/stores';
</script>

<nav>
  <ul>
    <li class:active={$page.url.pathname === '/'}>
      <a href="/">Accueil</a>
    </li>
    <li class:active={$page.url.pathname === '/ingredients'}>
        <a href="/ingredients">Ingredients</a>
    </li>
  </ul>
</nav>

<main>
  <slot />
</main>

<style>
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
  
  main {
    padding: 1em;
  }
</style>