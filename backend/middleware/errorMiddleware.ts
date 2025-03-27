import { BadRequestException, Context, Next, NotFoundException, ZodError } from '../deps.ts';

export const errorMiddleware = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof ZodError) {
            ctx.response.body = error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            }));
            ctx.response.status = 400;
        } else if (error instanceof NotFoundException || error instanceof BadRequestException) {
            ctx.response.status = error.statusCode;
            ctx.response.body = { message: error.message };
        } else if (error instanceof Error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        } else {
            ctx.response.status = 500;
            ctx.response.body = { message: 'Internal server error' };
        }
    }
};
