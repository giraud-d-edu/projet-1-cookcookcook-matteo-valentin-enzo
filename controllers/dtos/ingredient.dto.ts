import { Ingredient, IngredientCandidate } from '../../services/models/ingredient.model.ts';
export interface IngredientDto {
    id: string;
    nom: string;
}
export interface IngredientCandidateDto {
    nom: string;
}

export function fromIngredientToDto(ingredient: Ingredient): IngredientDto {
    return {
        ...ingredient,
    };
}

export function fromDtoToIngredient(dto: IngredientDto): Ingredient {
    return {
        ...dto,
    };
}

export function fromIngredientCandidateDtoToIngredientCandidate(dto: IngredientCandidateDto): IngredientCandidate {
    return {
        ...dto,
    };
}
