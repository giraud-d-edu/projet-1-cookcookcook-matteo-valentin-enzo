import { ObjectId } from '../../deps.ts';
import { Recette } from '../../services/models/recette.model.ts';
import { IngredientDbo } from './ingredient.dbo.ts';
export interface RecetteDBO {
    _id: ObjectId;
    nom: string;
    description: string;
    categorie: 'entrée' | 'plat' | 'dessert' | 'autre';
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientDbo[];
}

export function fromRecetteDboToRecette(dbo: RecetteDBO): Recette {
    return {
        ...dbo,
        id: dbo._id.toString(),
    };
}

export function fromRecetteToRecetteDbo(recette: Recette): RecetteDBO {
    return {
        ...recette,
        _id: new ObjectId(recette.id),
    };
}
