# CookCookCook - Frontend

Le frontend de CookCookCook est une application web moderne construite avec SvelteKit, offrant une interface utilisateur intuitive pour la gestion et le partage de recettes de cuisine.

## 🚀 Fonctionnalités

- Interface utilisateur moderne et responsive
- Gestion des recettes (création, modification, suppression)
- Système de recherche de recettes
- Système d'authentification
- Interface utilisateur intuitive et conviviale
- Design moderne avec Tailwind CSS

## 🛠️ Technologies Utilisées

- SvelteKit
- Tailwind CSS
- TypeScript
- Vite

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou pnpm ou yarn

## 🚀 Installation

1. Clonez le repository :

```bash
git clone [URL_DU_REPO]
cd frontend
```

2. Installez les dépendances :

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

3. Créez un fichier `.env` à la racine du projet frontend avec les variables d'environnement nécessaires :

```env
VITE_API_URL=http://localhost:3000
```

## 🛠️ Développement

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

Pour ouvrir automatiquement l'application dans votre navigateur :

```bash
npm run dev -- --open
```

## 🏗️ Build

Pour créer une version de production :

```bash
npm run build
# ou
pnpm build
# ou
yarn build
```

Pour prévisualiser la version de production :

```bash
npm run preview
# ou
pnpm preview
# ou
yarn preview
```

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── lib/           # Composants et utilitaires réutilisables
│   ├── routes/        # Pages et routes de l'application
│   └── app.html       # Template HTML principal
├── static/           # Fichiers statiques
├── tests/            # Tests unitaires et d'intégration
└── package.json      # Dépendances et scripts
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
