import * as recetteRepository from '../repositories/recette.repository.ts';
import { Recette, RecetteCandidate } from './models/recette.model.ts';
import { NotFoundException } from '../utils/exceptions.ts';

export const getAllRecetttesService = async (): Promise<Recette[]> => {
    return await recetteRepository.getAllRecettes();
};

export const getRecetteByIdService = async (id: string): Promise<Recette | null> => {
    return await recetteRepository.getRecetteById(id);
};

export const getRecetteByNomService = async (nom: string): Promise<Recette |null> => {
    return await recetteRepository.getRecetteByNom(nom);
};

export const createRecetteService = async (recetteCandidate: RecetteCandidate): Promise<Recette | null> => {
    return await recetteRepository.createRecette(recetteCandidate);
};

export const updateRecetteService = async (recette: Recette): Promise<Recette | null> => {
    const recetteId = await recetteRepository.getRecetteById(recette.id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await recetteRepository.updateRecette(recette);
};

export const deleteRecetteService = async (id: string): Promise<boolean> => {
    return await recetteRepository.deleteRecette(id);
};
