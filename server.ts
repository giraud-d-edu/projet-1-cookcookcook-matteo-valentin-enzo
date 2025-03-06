import { Application } from './deps.ts';
import Ingredientrouter from './controllers/ingredient.controller.ts';
import { connectDB } from './repositories/mongo.ts';

await connectDB();

const app = new Application();

app.use(Ingredientrouter.routes());
app.use(Ingredientrouter.allowedMethods());

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port: port });
