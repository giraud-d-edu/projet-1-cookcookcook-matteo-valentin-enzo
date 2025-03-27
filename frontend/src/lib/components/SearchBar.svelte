<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import debounce from 'lodash/debounce';
    import '../../styles/SearchBar.scss';

    // Initialiser searchQuery avec la valeur de l'URL si elle existe
    $: searchQuery = $page.url.searchParams.get('q') || '';

    const handleSearch = debounce(async () => {
        if (browser) {
            if (searchQuery.length > 0) {
                await goto(`/search?q=${encodeURIComponent(searchQuery)}`);
            } else {
                await goto('/');
            }
        }
    }, 300);

    $: if (searchQuery !== null) handleSearch();
</script>

<div class="search-bar">
    <input type="text" bind:value={searchQuery} placeholder="Rechercher une recette..." class="search-bar__input" />
    <svg
        class="search-bar__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
</div>
