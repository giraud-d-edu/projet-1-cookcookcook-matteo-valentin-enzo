import { Router, Context, RouterContext } from '../deps.ts';
import * as recetteService from '../services/recette.service.ts';
import {
    fromRecetteToDto,
    fromRecetteCandidateDtoToRecetteCandidate,
    fromDtoToRecette,
    recetteCandidateDtoSchema,
} from './dtos/recette.dto.ts';
import { NotFoundException } from '../utils/exceptions.ts';
import { Recette } from '../services/models/recette.model.ts';

const router = new Router();

router
    .get('/recettes', getAllRecettesController)
    .get('/recettes/:id', getRecetteByIdController)
    .post('/recettes', createRecetteController)
    .put('/recettes/:id', updateRecetteController)
    .delete('/recettes/:id', deleteRecetteController);

async function getAllRecettesController(ctx: Context) {
    const nom = ctx.request.url.searchParams.get('nom');
    const categorie = ctx.request.url.searchParams.get('categorie');
    if (nom) {
        try {
            ctx.response.body = fromRecetteToDto(await recetteService.getRecetteByNomService(nom));
        } catch (error) {
            if (error instanceof NotFoundException) {
                ctx.response.status = 200;
                ctx.response.body = [];
            } else {
                console.error('Error getting recette by name:', error);
                ctx.response.status = 500;
                ctx.response.body = { error: 'Internal server error' };
            }
        }
    } else if (categorie) {
        try {
            ctx.response.body = (await recetteService.getRecetteByCategorieService(categorie)).map((recette) =>
                fromRecetteToDto(recette),
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                ctx.response.status = 200;
                ctx.response.body = [];
            } else {
                console.error('Error getting recette by categorie:', error);
                ctx.response.status = 500;
                ctx.response.body = { error: 'Internal server error' };
            }
        }
    } else {
        ctx.response.body = (await recetteService.getAllRecettesService()).map((recette) => fromRecetteToDto(recette));
    }
}

async function getRecetteByIdController(ctx: RouterContext<'/recettes/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing book ID' };
        return;
    }

    try {
        ctx.response.body = fromRecetteToDto(await recetteService.getRecetteByIdService(idParam));
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 200;
            ctx.response.body = [];
        } else {
            console.error('Error getting book by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function createRecetteController(ctx: Context) {
    try {
        const body = await ctx.request.body({ type: 'json' }).value;

        const validationResult = recetteCandidateDtoSchema.safeParse(body);
        if (!validationResult.success) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: 'Invalid input',
                details: validationResult.error.format(),
            };
            return;
        }
        const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate(validationResult.data);
        ctx.response.status = 201;
        ctx.response.body = fromRecetteToDto(await recetteService.createRecetteService(recetteCandidate));
    } catch (e) {
        console.error('Error creating recette:', e);
        ctx.response.status = 500;
        ctx.response.body = { error: 'Internal server error' };
    }
}

async function updateRecetteController(ctx: RouterContext<'/recettes/:id'>) {
    try {
        const body = await ctx.request.body({ type: 'json' }).value;
        const id = ctx.params.id;

        const validationResult = recetteCandidateDtoSchema.safeParse(body);
        if (!validationResult.success) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: 'Invalid input',
                details: validationResult.error.format(),
            };
        }

        const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate(validationResult.data);
        const recette: Recette = fromDtoToRecette({ ...recetteCandidate, id });
        ctx.response.status = 200;
        ctx.response.body = {
            message: 'Recette updated successfully',
            body: fromRecetteToDto(await recetteService.updateRecetteService(recette)),
        };
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Recette not found' };
        } else {
            console.error('Error getting book by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function deleteRecetteController(ctx: RouterContext<'/recettes/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing Recette ID' };
        return;
    }

    try {
        await recetteService.deleteRecetteService(idParam);
        ctx.response.status = 204;
        ctx.response.body = null;
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Recette not found' };
        } else {
            console.error('Error deleting recette:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

export default router;
