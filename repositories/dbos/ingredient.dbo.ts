import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { Ingredient } from "../../services/models/ingredient.model.ts";

export interface IngredientDbo {
    _id: ObjectId;
    nom: string;
}

export function fromIngredientDboToIngredient(dbo: IngredientDbo): Ingredient {
    return {
        ...dbo,
        id: dbo._id.toString(),
    };
}

export function fromIngredientToIngredientDbo(ingredient: Ingredient): IngredientDbo {
    return {
        ...ingredient,
        _id: new ObjectId(ingredient.id),
    };
}
