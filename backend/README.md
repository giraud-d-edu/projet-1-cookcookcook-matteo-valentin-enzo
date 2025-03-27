# CookCookCook Backend 🔧

## Technologies Principales

-   **Deno**: Runtime moderne pour JavaScript et TypeScript
-   **Oak**: Framework web pour Deno (similaire à Express.js)
-   **MongoDB**: Base de données NoSQL
-   **Zod**: Validation des données avec TypeScript
-   **TypeScript**: Support natif avec Deno

## Structure du Projet

```
backend/
├── controllers/        # Contrôleurs pour la logique métier
├── middleware/        # Middlewares personnalisés
├── repositories/      # Couche d'accès aux données
├── services/         # Services métier
├── utils/            # Utilitaires et helpers
├── deps.ts           # Gestion des dépendances
├── server.ts         # Point d'entrée de l'application
├── .env.exemple      # Template des variables d'environnement
├── deno.json        # Configuration de Deno
├── postman_collection.json  # Collection Postman pour tester l'API
└── data-mongodb-*.json     # Données d'exemple pour MongoDB
```

## Prérequis

-   [Deno](https://deno.land/#installation) (version recommandée : 2.2.5)
-   MongoDB (version recommandée : ≥ 5.0)
-   Un éditeur compatible avec Deno/TypeScript

## Installation

1. Installer Deno

```bash
# macOS ou Linux
curl -fsSL https://deno.land/x/install/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex
```

2. Configurer les variables d'environnement

```bash
cp .env.exemple .env
```

Modifier les variables dans le fichier `.env` selon votre environnement :

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cook-db
PORT=8000
```

3. Démarrer le serveur

```bash
# Mode développement
deno task dev

# Mode production
deno task run
```

Le serveur sera accessible à l'adresse : `http://localhost:8000`

## Base de Données

### Collections MongoDB

-   `recettes` : Stockage des recettes
-   `ingredients` : Stockage des ingrédients

### Import des données d'exemple

```bash
# Import des ingrédients
mongoimport --db cook-db --collection ingredients --file data-mongodb-ingredient.json --jsonArray

# Import des recettes
mongoimport --db cook-db --collection recettes --file data-mongodb-recettes.json --jsonArray
```

## API Endpoints

### Ingrédients

-   `POST /ingredients` : Création d'un ingrédient
-   `GET /ingredients` : Liste des ingrédients
-   `GET /ingredients/nom/:nom` : Recherche d'ingrédients par nom
-   `PUT /ingredients/:id` : Modification d'un ingrédient
-   `DELETE /ingredients/:id` : Suppression d'un ingrédient

### Recettes

-   `GET /recettes` : Liste des recettes
-   `GET /recettes/nom/:nom` : Recherche de recettes par nom
-   `GET /recettes/categories/:categorie` : Filtrage par catégorie (entrée, plat, dessert, autre)
-   `POST /recettes` : Création d'une recette
-   `PUT /recettes/:id` : Modification d'une recette
-   `DELETE /recettes/:id` : Suppression d'une recette

## Tests et Documentation

### Collection Postman

Une collection Postman (`postman_collection.json`) est fournie pour tester l'API. Pour l'utiliser :

1. Importer le fichier dans Postman
2. Configurer l'environnement avec la bonne URL de base
3. Tester les différents endpoints

### Validation des Données

-   Utilisation de Zod pour la validation des schémas
-   Vérification stricte des types TypeScript
-   Gestion des erreurs avec des exceptions personnalisées

## Sécurité

-   Validation des entrées avec Zod
-   Protection CORS configurée
-   Gestion sécurisée des erreurs
-   Logs des requêtes et des erreurs

## Développement

### Scripts Disponibles

-   `deno task dev` : Lance le serveur en mode développement avec rechargement automatique
-   `deno task run` : Lance le serveur en mode production
-   `deno task format` : Formate le code selon les conventions
-   `deno lint` : Vérifie le code avec le linter
-   `deno test` : Lance les tests (à implémenter)

### Bonnes Pratiques

-   Utilisation des types stricts TypeScript
-   Documentation du code avec JSDoc
-   Gestion des erreurs centralisée
-   Architecture en couches (Controller -> Service -> Repository)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.

## Additional Resources

### Postman Collection

A Postman collection (`postman_collection.json`) is included in the repository
to help test the API endpoints. You can import this collection into Postman to
quickly start making requests to your local server.

### Sample Database

A sample MongoDB database structure (`data-mongodb.json`) is provided to help
you understand the data schema and get started with some initial data. You can
import this file into your MongoDB instance using:
