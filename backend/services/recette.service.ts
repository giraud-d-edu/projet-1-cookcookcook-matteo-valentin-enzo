import * as recetteRepository from '../repositories/recette.repository.ts';
import { Recette, RecetteCandidate } from './models/recette.model.ts';
import { NotFoundException } from '../utils/exceptions.ts';

export const getAllRecetttesService = async (): Promise<Recette[]> => {
    return await recetteRepository.getAllRecettes();
};

export const getRecetteByIdService = async (id: string): Promise<Recette> => {
    return await recetteRepository.getRecetteById(id);
};

export const getRecetteByNomService = async (nom: string): Promise<Recette> => {
    return await recetteRepository.getRecetteByNom(nom);
};

export const getRecetteByCategorieService = async (
    categorie: 'entrée' | 'plat' | 'dessert' | 'autre',
): Promise<Recette[]> => {
    return await recetteRepository.getRecetteByCategorie(categorie);
};

export const createRecetteService = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    return await recetteRepository.createRecette(recetteCandidate);
};

export const updateRecetteService = async (recette: Recette): Promise<Recette> => {
    const recetteId = await recetteRepository.getRecetteById(recette.id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await recetteRepository.updateRecette(recette);
};

export const deleteRecetteService = async (id: string): Promise<boolean> => {
    return await recetteRepository.deleteRecette(id);
};
