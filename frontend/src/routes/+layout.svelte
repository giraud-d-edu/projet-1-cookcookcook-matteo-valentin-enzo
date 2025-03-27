<script lang="ts">
    import NavBar from '$lib/components/navbar.svelte';
    import '../styles/Layout.scss';
</script>

<NavBar />

<main>
    <slot />
</main>
