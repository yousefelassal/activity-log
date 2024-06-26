import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof z.ZodError) {
            res.status(400).json({
            error: 'Invalid request data',
            details: error.errors.map((e) => `${e.path}: ${e.message}`),
            });
        } else {
            next(error);
        }
    }
  };
}