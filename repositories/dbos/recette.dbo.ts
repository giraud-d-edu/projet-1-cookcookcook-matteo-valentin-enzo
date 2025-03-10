import { ObjectId } from '../../deps.ts';
import { Recette } from '../../services/models/recette.model.ts';
import { Ingredient } from '../../services/models/ingredient.model.ts';

export interface RecetteDbo {
    _id: ObjectId;
    nom: string;
    description: string;
    instructions: string;
    categorie: 'entrée' | 'plat' | 'dessert' | 'autre';
    tempsPreparation: number;
    origine: string;
    ingredients: Ingredient[];
}

export function fromRecetteDboToRecette(dbo: RecetteDbo): Recette {
    // TODO : ça hard copy aussi le champ _id vu qu'il n'y a pas de typage
    /*
    const recette = JSON.parse(JSON.stringify(dbo));
    delete recette._id;
    recette.id = dbo._id.toString();
    return recette;
     */
    return {
        ...dbo,
        id: dbo._id.toString(),
    };
}

export function fromRecetteToRecetteDbo(recette: Recette): RecetteDbo {
    return {
        ...recette,
        _id: new ObjectId(recette.id),
    };
}
