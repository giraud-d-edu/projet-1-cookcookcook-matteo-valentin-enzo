import * as recetteRepository from '../repositories/recette.repository.ts';
import { Recette, RecetteCandidate } from './models/recette.model.ts';
import { NotFoundException, BadRequestException } from '../deps.ts';

export const getAllRecettesService = async (): Promise<Recette[]> => {
    return await recetteRepository.getAllRecettes();
};

export const getRecetteByIdService = async (id: string): Promise<Recette> => {
    return await recetteRepository.getRecetteById(id);
};

export const getRecetteByNomService = async (nom: string): Promise<Recette[]> => {
    return await recetteRepository.getRecetteByNom(nom);
};

export const getRecetteByCategorieService = async (
    categorie: string,
): Promise<Recette[]> => {
    // TODO: Vérifier si on gère l'erreur de type NotFoundException (400) ou on retourne une liste vide (200)
    const validCategories = ['entrée', 'plat', 'dessert', 'autre'] as const;
    if (!validCategories.includes(categorie as any)) {
        throw new BadRequestException(`Catégorie invalide. Les catégories valides sont : ${validCategories.join(', ')}`);
    }
    const categorieEnum = categorie as 'entrée' | 'plat' | 'dessert' | 'autre';
    return await recetteRepository.getRecetteByCategorie(categorieEnum);
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

export const deleteRecetteService = async (id: string): Promise<void> => {
    const recetteId = await recetteRepository.getRecetteById(id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await recetteRepository.deleteRecette(id);
};
