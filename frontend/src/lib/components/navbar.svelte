<script lang="ts">
  import { page } from '$app/stores';
  import SearchBar from './SearchBar.svelte';
</script>

<nav>
  <div class="nav-left">
    <a href="/" class="logo">CookCookCook</a>
  </div>
  
  <div class="nav-center">
    <SearchBar />
  </div>
  
  <div class="nav-right">
    <ul>
      <li class:active={$page.url.pathname === '/categories'}>
        <a href="/categories">Catégories</a>
      </li>
      <li class:active={$page.url.pathname === '/recettes/add'}>
      <a href="/recettes/add" class:active={$page.url.pathname === '/add'}>Ajouter une recette</a>
      </li>
    </ul>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    z-index: 1000;
    height: 60px;
  }

  .nav-left {
    flex: 0 0 200px;
  }

  .nav-center {
    flex: 0 0 400px;
    margin: 0 2rem;
  }

  .nav-right {
    flex: 0 0 auto;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #0891b2;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  li a {
    text-decoration: none;
    color: #4b5563;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  li a:hover {
    color: #0891b2;
  }

  .active a {
    color: #0891b2;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    nav {
      padding: 0.75rem 1rem;
      height: auto;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-left, .nav-center, .nav-right {
      width: 100%;
      margin: 0;
    }

    .nav-right ul {
      justify-content: center;
      gap: 1rem;
    }
  }
</style>