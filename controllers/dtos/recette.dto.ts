import { IngredientDto } from "./ingredient.dto.ts";
import { Recette, RecetteCandidate } from "../../services/models/recette.model.ts";

export interface RecetteDto {
    id: string;
    nom: string;
    description: string;
    instructions: string;
    categorie: "entrée" | "plat" | "dessert" | "autre";
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientDto[];
}

export interface RecetteCandidateDto {
    nom: string;
    description: string;
    instructions: string;
    categorie: "entrée" | "plat" | "dessert" | "autre";
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientDto[];
}

export function fromRecetteToDto(recette: Recette): RecetteDto {
    return {
        ...recette
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
    }
}