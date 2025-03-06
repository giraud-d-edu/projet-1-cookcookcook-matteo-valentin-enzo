import * as recetteRepository from "../repositorie/book.repository.ts";
import { Recette, RecetteCandidate } from "./models/recette.model";


export const getAllRecetttesService = async (): Promise<Recette[]> => {
    return await recetteRepository.getAllRecettes();
}

export const getRecetteByIdService = async (): Promise<Recette> => {
    return await recetteRepository.getRecetteById();
}

export const createRecetteService = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    return await recetteRepository.createRecette(recetteCandidate);
}

export const updateRecetteService = async (recette: Recette): Promise<Recette> => {
    // Tester si recette existe (via son id)
    return await recetteRepository.updateRecette(recette);
}

export const deleteRecetteService = async (id: string): Promise<Recette> => {
    return await recetteRepository.deleteRecette(id);
}