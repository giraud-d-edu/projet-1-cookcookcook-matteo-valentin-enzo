import { IngredientDto, ingredientDtoSchema } from './ingredient.dto.ts';
import { Recette, RecetteCandidate } from '../../services/models/recette.model.ts';
import { z } from '../../deps.ts';

export const recetteDtoSchema = z.object({
    id: z.string(),
    nom: z.string().min(5).max(100),
    description: z.string().min(1).max(500),
    instructions: z.string().max(1000),
    categorie: z.enum(['entrée', 'plat', 'dessert', 'autre']),
    tempsPreparation: z.number().positive(),
    origine: z.string().min(1).max(50),
    ingredients: z.array(ingredientDtoSchema),
});

export type RecetteDto = z.infer<typeof recetteDtoSchema>;

export const recetteCandidateDtoSchema = z.object({
    nom: z.string().min(5).max(100),
    description: z.string().min(1).max(500),
    instructions: z.string().max(1000),
    categorie: z.enum(['entrée', 'plat', 'dessert', 'autre']),
    tempsPreparation: z.number().positive(),
    origine: z.string().min(1).max(50),
    ingredients: z.array(ingredientDtoSchema),
});

export interface RecetteCandidateDto {
    nom: string;
    description: string;
    instructions: string;
    categorie: 'entrée' | 'plat' | 'dessert' | 'autre';
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientDto[];
}

export function fromRecetteToDto(recette: Recette): RecetteDto {
    return {
        ...recette,
    };
}

export function fromDtoToRecette(recetteDto: RecetteDto): Recette {
    return {
        ...recetteDto,
    };
}

export function fromRecetteCandidateDtoToRecetteCandidate(recetteCandidateDto: RecetteCandidateDto): RecetteCandidate {
    return {
        ...recetteCandidateDto,
    };
}
