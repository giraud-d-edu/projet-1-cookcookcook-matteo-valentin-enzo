import { Router, Context, RouterContext } from '../deps.ts';
import { NotFoundException } from '../utils/exceptions.ts';

import * as ingredientService from '../services/ingredient.service.ts';
import {
    IngredientDto,
    IngredientCandidateDto,
    fromIngredientToDto,
    fromIngredientCandidateDtoToIngredientCandidate,
    fromDtoToIngredient,
} from './dtos/ingredient.dto.ts';
import { Ingredient } from '../services/models/ingredient.model.ts';

const router = new Router();

router
    .get('/ingredients', getAllIngredientsController)
    .get('/ingredients/:id', getIngredientByIdController)
    .post('/ingredients', createIngredientController)
    .put('/ingredients', updateIngredientController)
    .delete('/ingredients/:id', deleteIngredientController);

async function getAllIngredientsController(ctx: Context) {
    ctx.response.body = (await ingredientService.getAllIngredientsService()).map((ingredient) =>
        fromIngredientToDto(ingredient),
    ); // Retourne directement les Dtos du service
}

async function getIngredientByIdController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }

    try {
        ctx.response.body = fromIngredientToDto(await ingredientService.getIngredientByIdService(idParam)); // Retourne directement le Dto du service
    } catch (error) {
        if (error instanceof NotFoundException) {
            // Capturer NotFoundException
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredient not found' };
        } else {
            // Gérer les autres types d'erreurs si nécessaire (erreur serveur, etc.)
            console.error('Error getting ingredient by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function createIngredientController(ctx: Context) {
    try {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'Request body is required' };
            return;
        }
        const body = await ctx.request.body({ type: 'json' }).value;
        const { nom } = body as IngredientCandidateDto;

        if (!nom) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'Missing required fields (nom)' };
            return;
        }

        const ingredientCandidateDto: IngredientCandidateDto = { nom };
        const ingredientCandidate = fromIngredientCandidateDtoToIngredientCandidate(ingredientCandidateDto);
        ctx.response.status = 201;
        ctx.response.body = fromIngredientToDto(await ingredientService.createIngredientService(ingredientCandidate));
    } catch (e) {
        console.error('Error creating ingredient:', e);
        ctx.response.status = 500;
        ctx.response.body = { error: 'Internal server error' };
    }
}

async function updateIngredientController(ctx: Context) {
    if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Request body is required' };
        return;
    }
    const body = await ctx.request.body({ type: 'json' }).value;
    const { id, nom } = body as IngredientDto;

    if (!id || !nom) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing required fields for update (nom)' };
        return;
    }

    const ingredientDto: IngredientDto = { id, nom };
    const ingredient: Ingredient = fromDtoToIngredient(ingredientDto);
    const updatedIngredientDto = fromIngredientToDto(await ingredientService.updateIngredientService(ingredient));
    if (updatedIngredientDto) {
        ctx.response.status = 200;
        ctx.response.body = { message: 'Ingredient updated successfully', body: updatedIngredientDto };
    } else {
        ctx.response.status = 404;
        ctx.response.body = { error: 'Ingredient not found' };
    }
}

async function deleteIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }

    const success = await ingredientService.deleteIngredientService(idParam);
    if (success) {
        ctx.response.status = 204;
        ctx.response.body = null; // 204 No Content pour la suppression réussie
    } else {
        ctx.response.status = 404; // 404 si deleteIngredientService retourne false (livre non trouvé)
        ctx.response.body = { error: 'Ingredient not found' };
    }
}

export default router;
