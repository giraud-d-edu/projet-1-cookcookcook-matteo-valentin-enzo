import { Context, NotFoundException, Router, RouterContext } from '../deps.ts';
import * as ingredientService from '../services/ingredient.service.ts';
import {
    fromDtoToIngredient,
    fromIngredientCandidateDtoToIngredientCandidate,
    fromIngredientToDto,
    IngredientCandidateDto,
    IngredientDto,
} from './dtos/ingredient.dto.ts';
import { Ingredient } from '../services/models/ingredient.model.ts';

const router = new Router();

router
    .get('/ingredients', getAllIngredientsController)
    .get('/ingredients/:id', getIngredientByIdController)
    .get('/ingredients/nom/:nom', getIngredientByNomController)
    .post('/ingredients', createIngredientController)
    .put('/ingredients/:id', updateIngredientController)
    .delete('/ingredients/:id', deleteIngredientController);

async function getAllIngredientsController(ctx: Context) {
    try {
        ctx.response.body = (await ingredientService.getAllIngredientsService()).map((ingredient) =>
            fromIngredientToDto(ingredient),
        );
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredients not found' };
        } else {
            console.error('Error getting ingredients:', error);
            ctx.response.status = 500;
            ctx.response.body = {
                error: 'Internal server error. No ingredients found',
            };
        }
    }
}

async function getIngredientByIdController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }

    try {
        ctx.response.body = fromIngredientToDto(await ingredientService.getIngredientByIdService(idParam));
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredient not found' };
        } else {
            console.error('Error getting ingredient by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function getIngredientByNomController(ctx: RouterContext<'/ingredients/nom/:nom'>) {
    const nomParams = ctx.params.nom;
    if (!nomParams) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient Nom' };
        return;
    }

    try {
        ctx.response.body = fromIngredientToDto(await ingredientService.getIngredientByNomService(nomParams));
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredient not found' };
        } else {
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

async function updateIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Request body is required' };
        return;
    }
    const body = await ctx.request.body({ type: 'json' }).value;
    const id = ctx.params.id;
    const { nom } = body as IngredientDto;

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
        ctx.response.body = {
            message: 'Ingredient updated successfully',
            body: updatedIngredientDto,
        };
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
        ctx.response.body = null;
    } else {
        ctx.response.status = 404;
        ctx.response.body = { error: 'Ingredient not found' };
    }
}

export default router;
