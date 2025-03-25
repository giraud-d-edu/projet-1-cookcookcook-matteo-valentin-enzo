<script lang="ts">
  import { page } from '$app/stores';
</script>

<nav class="navbar">
  <div class="nav-content">
    <a href="/" class="logo">CookCookCook</a>
    
    <div class="nav-links">
      <a href="/" class:active={$page.url.pathname === '/'}>Accueil</a>
      <a href="/recettes" class:active={$page.url.pathname === '/recettes'}>Recettes</a>
      <a href="/categories" class:active={$page.url.pathname === '/categories'}>Catégories</a>
      <a href="/favoris" class:active={$page.url.pathname === '/favoris'}>Favoris</a>
    </div>

    <div class="search-bar">
      <input type="text" placeholder="Rechercher une recette..." />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #3498db;
  }

  .nav-links a.active {
    color: #3498db;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 20px;
    padding: 0.5rem;
  }

  .search-bar input {
    border: none;
    background: none;
    padding: 0.25rem 0.5rem;
    outline: none;
    width: 200px;
  }

  .search-bar button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
  }

  .search-bar button:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    .nav-content {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      gap: 1rem;
    }

    .search-bar {
      width: 100%;
    }

    .search-bar input {
      width: 100%;
    }
  }
</style>