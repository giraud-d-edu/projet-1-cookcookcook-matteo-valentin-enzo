import { ObjectId } from '../../deps.ts';
import { Recette } from '../../services/models/recette.model.ts';

export class RecetteDBO {
    _id: ObjectId;
    nom: string;
    description: string;
    ingredients: string[];
    etapes: string[];
    temps_preparation: number;
    temps_cuisson: number;
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
        _id: new ObjectId(recette._id),
    };
}
