<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import debounce from 'lodash/debounce';
    
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

<div class="search-container">
    <input
        type="text"
        bind:value={searchQuery}
        placeholder="Rechercher une recette..."
        class="search-input"
    />
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
</div>

<style>
    .search-container {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
    
    .search-input {
        width: 100%;
        padding: 10px 40px 10px 15px;
        border: 2px solid #e5e7eb;
        border-radius: 25px;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #0891b2;
        box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
    }

    .search-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        pointer-events: none;
        width: 18px;
        height: 18px;
    }

    @media (max-width: 1024px) {
        .search-container {
            max-width: 300px;
        }
        
        .search-icon {
            right: -30px;
        }
    }

    @media (max-width: 768px) {
        .search-container {
            max-width: 100%;
            margin: 0;
        }
        
        .search-icon {
            right: 15px;
        }
        
        .search-input {
            padding-right: 45px;
        }
    }

    @media (max-width: 480px) {
        .search-input {
            font-size: 13px;
            padding: 8px 40px 8px 12px;
        }
        
        .search-icon {
            width: 16px;
            height: 16px;
        }
    }
</style> 