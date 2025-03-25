import { Context, NotFoundException, Router, RouterContext } from '../deps.ts';
import * as ingredientService from '../services/ingredient.service.ts';
import {
    fromDtoToIngredient,
    fromIngredientCandidateDtoToIngredientCandidate,
    fromIngredientToDto,
    ingredientCandidateDtoSchema,
} from './dtos/ingredient.dto.ts';
import { Ingredient } from '../services/models/ingredient.model.ts';

const router = new Router();

router
    .get('/ingredients', getAllIngredientsController)
    .get('/ingredients/:id', getIngredientByIdController)
    .post('/ingredients', createIngredientController)
    .put('/ingredients/:id', updateIngredientController)
    .delete('/ingredients/:id', deleteIngredientController);

async function getAllIngredientsController(ctx: Context) {
    const nom = ctx.request.url.searchParams.get('nom');
    if (nom) {
        try {
            ctx.response.body = fromIngredientToDto(await ingredientService.getIngredientByNomService(nom));
        } catch (error) {
            if (error instanceof NotFoundException) {
                ctx.response.status = 200;
                ctx.response.body = [];
            } else {
                console.error('Error getting ingredient by nom:', error);
                ctx.response.status = 500;
                ctx.response.body = { error: 'Internal server error' };
            }
        }
    } else {
        try {
            ctx.response.body = (await ingredientService.getAllIngredientsService()).map((ingredient) =>
                fromIngredientToDto(ingredient),
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                ctx.response.status = 200;
                ctx.response.body = [];
            } else {
                console.error('Error getting ingredients:', error);
                ctx.response.status = 500;
                ctx.response.body = {
                    error: 'Internal server error. No ingredients found',
                };
            }
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
            ctx.response.status = 200;
            ctx.response.body = [];
        } else {
            console.error('Error getting ingredient by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function createIngredientController(ctx: Context) {
    try {
        const body = await ctx.request.body({ type: 'json' }).value;

        const validationResult = ingredientCandidateDtoSchema.safeParse(body);
        if (!validationResult.success) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "Invalid input",
                details: validationResult.error.format(),
            };
            return;
        }
        const ingredientCandidate = fromIngredientCandidateDtoToIngredientCandidate(validationResult.data);
        ctx.response.status = 201;
        ctx.response.body = fromIngredientToDto(await ingredientService.createIngredientService(ingredientCandidate));
    } catch (e) {
        console.error('Error creating ingredient:', e);
        ctx.response.status = 500;
        ctx.response.body = { error: 'Internal server error' };
    }
}

async function updateIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    try {
        const body = await ctx.request.body({ type: 'json' }).value;
        const id = ctx.params.id;

        const validationResult = ingredientCandidateDtoSchema.safeParse(body);
        if (!validationResult.success) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "Invalid input",
                details: validationResult.error.format(),
            };
            return;
        }

        const ingredientCandidate = fromIngredientCandidateDtoToIngredientCandidate(validationResult.data);
        const ingredient: Ingredient = fromDtoToIngredient({ ...ingredientCandidate, id });
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Ingredient updated successfully',
            body: fromIngredientToDto(await ingredientService.updateIngredientService(ingredient)),
        };
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredient not found' };
        } else {
            console.error('Error updating ingredient:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function deleteIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }

    try {
        await ingredientService.deleteIngredientService(idParam);
        ctx.response.status = 204;
        ctx.response.body = null;
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Ingredient not found' };
        } else {
            console.error('Error deleting ingredient:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

export default router;
