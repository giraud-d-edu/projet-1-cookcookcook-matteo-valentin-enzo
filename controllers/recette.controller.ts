import { Router, Context, RouterContext } from '../deps.ts';
import * as recetteService from '../services/recette.service.ts';
import {
    RecetteDto,
    RecetteCandidateDto,
    fromRecetteToDto,
    fromRecetteCandidateDtoToRecetteCandidate,
    fromDtoToRecette,
    recetteCandidateDtoSchema,
} from './dtos/recette.dto.ts';
import { NotFoundException } from '../utils/exceptions.ts';
import { Recette } from '../services/models/recette.model.ts';

const router = new Router();

// TODO Should have : Implémenter un middleware pour les catch pour faire comme vous avez fait le if instenceof else 500. Ca allègera votre code
router
    .get('/recettes', getAllRecettesController)
    .get('/recettes/:id', getRecetteByIdController)
    .get('/recettes/nom/:nom', getRecetteByNomController)
    .get('/recettes/categories/:categorie', getRecetteByCategorieController)
    .post('/recettes', createRecetteController)
    .put('/recettes/:id', updateRecetteController)
    .delete('/recettes/:id', deleteRecetteController);

async function getAllRecettesController(ctx: Context) {
    ctx.response.body = (await recetteService.getAllRecettesService()).map((recette) => fromRecetteToDto(recette));
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
            ctx.response.status = 404;
            ctx.response.body = { error: 'Recette not found' };
        } else {
            console.error('Error getting book by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

// TODO : Nice to have : Query Param
// TODO : L'URL n'est pas RESTful, il faudrait plutôt faire /recettes?nom=nom car le nom n'est pas une sous entité de recette
async function getRecetteByNomController(ctx: RouterContext<'/recettes/nom/:nom'>) {
    const nomParams = ctx.params.nom;
    if (!nomParams) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing recette Nom' };
        return;
    }

    try {
        ctx.response.body = fromRecetteToDto(await recetteService.getRecetteByNomService(nomParams));
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Recette not found' };
        } else {
            console.error('Error getting recette by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function getRecetteByCategorieController(ctx: RouterContext<'/recettes/categories/:categorie'>) {
    const categorieParams = ctx.params.categorie as 'entrée' | 'plat' | 'dessert' | 'autre';
    if (!categorieParams) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing recette Categorie' };
        return;
    }

    try {
        ctx.response.body = (await recetteService.getRecetteByCategorieService(categorieParams)).map((recette) =>
            fromRecetteToDto(recette),
        );
    } catch (error) {
        if (error instanceof NotFoundException) {
            ctx.response.status = 404;
            ctx.response.body = { error: 'Recette not found' };
        } else {
            console.error('Error getting recette by ID:', error);
            ctx.response.status = 500;
            ctx.response.body = { error: 'Internal server error' };
        }
    }
}

async function createRecetteController(ctx: Context) {
    try {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'Request body is required' };
            return;
        }
        const body = await ctx.request.body({ type: 'json' }).value;
        const { nom, description, instructions, categorie, tempsPreparation, origine, ingredients } =
            body as RecetteCandidateDto;

        // TODO a supprimer car zod va également faire la vérification
        if (!nom || !description || !instructions || !categorie || !tempsPreparation || !origine || !ingredients) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: 'Missing required fields (nom, description, instruction, categorie, tempsPreparation, origine, ingredients)',
            };
            return;
        }

        // TODO : Should have : utiliser le safeParse de zod pour avoir des erreurs pus précises. Vous faites déjà pas mal de vérification que zod peux vous faire via ce code
        /*
        const validationResult = recetteCandidateDtoSchema.safeParse(body);
        if (!validationResult.success) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "Invalid input",
                details: validationResult.error.format(),
            };
            return;
        }
        const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate(validationResult.data);
        */

        try {
            recetteCandidateDtoSchema.parse({
                nom,
                description,
                instructions,
                categorie,
                tempsPreparation,
                origine,
                ingredients,
            });
        } catch {
            ctx.response.status = 400;
            ctx.response.body = {
                error: 'One of recette values is incorrect, does not respect the size or is not well written',
            };
            return;
        }

        const recetteCandidateDto: RecetteCandidateDto = {
            nom,
            description,
            instructions,
            categorie,
            tempsPreparation,
            origine,
            ingredients,
        };
        const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate(recetteCandidateDto);
        ctx.response.status = 201;
        ctx.response.body = fromRecetteToDto(await recetteService.createRecetteService(recetteCandidate));
    } catch (e) {
        console.error('Error creating recette:', e);
        ctx.response.status = 500;
        ctx.response.body = { error: 'Internal server error' };
    }
}

async function updateRecetteController(ctx: RouterContext<'/recettes/:id'>) {
    if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Request body is required' };
        return;
    }
    const body = await ctx.request.body({ type: 'json' }).value;
    const id = ctx.params.id;
    const { nom, description, instructions, categorie, tempsPreparation, origine, ingredients } = body as RecetteDto;

    if (!id || !nom || !description || !instructions || !categorie || !tempsPreparation || !origine || !ingredients) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Missing required fields for update (nom, description, instruction, categorie, tempsPreparation, origine, ingredients)',
        };
        return;
    }

    try {
        recetteCandidateDtoSchema.parse({
            nom,
            description,
            instructions,
            categorie,
            tempsPreparation,
            origine,
            ingredients,
        });
    } catch {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'One of recette values is incorrect, does not respect the size or is not well written',
        };
        return;
    }

    const recetteDto: RecetteDto = {
        id,
        nom,
        description,
        instructions,
        categorie,
        tempsPreparation,
        origine,
        ingredients,
    };
    const recette: Recette = fromDtoToRecette(recetteDto);
    try {
        ctx.response.body = {
            message: 'Recette updated successfully',
            body: fromRecetteToDto(await recetteService.updateRecetteService(recette)),
        };
        ctx.response.status = 200;
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

    const success = await recetteService.deleteRecetteService(idParam);
    if (success) {
        ctx.response.status = 204;
        ctx.response.body = null;
    } else {
        ctx.response.status = 404;
        ctx.response.body = { error: 'Recette not found' };
    }
}

export default router;
