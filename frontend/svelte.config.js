import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess({
        postcss: true,
    }),

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
            // Options spécifiques pour l'adaptateur
            precompress: true, // Active la précompression des fichiers statiques
            strict: true,
        }),

        // Optimisations pour la performance
        inlineStyleThreshold: 8192, // Inline les styles CSS < 8KB

        // Configuration des assets statiques
        files: {
            assets: 'static',
        },

        // Optimisation du chargement
        serviceWorker: {
            register: true,
            files: (filepath) => {
                // Exclure les fichiers d'analyse et les assets de grande taille
                return !filepath.includes('stats.html') && !filepath.match(/\.(mp4|webm|wav|mp3|m4a|aac|oga)$/);
            },
        },

        // Optimisation du bundle
        moduleExtensions: ['.js', '.ts', '.svelte'],

        // Caching amélioré
        csp: {
            mode: 'auto',
            directives: {
                'cache-control': ['public', 'max-age=31536000', 'immutable'],
            },
        },

        // Optimiser les headers
        headers: {
            '/': {
                'Cache-Control': 'public, max-age=600',
            },
            '/assets': {
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        },
    },
};

export default config;
