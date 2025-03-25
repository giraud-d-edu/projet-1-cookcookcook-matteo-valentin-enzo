import { Application } from './deps.ts';
import Ingredientrouter from './controllers/ingredient.controller.ts';
import RecetteRouter from './controllers/recette.controller.ts';
import { connectDB } from './repositories/mongo.ts';
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

await connectDB();

const app = new Application();
app.use(oakCors({ origin: "http://127.0.0.1:5173" }));
app.use(Ingredientrouter.routes());
app.use(Ingredientrouter.allowedMethods());
app.use(RecetteRouter.routes());
app.use(RecetteRouter.allowedMethods());

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port: port });
