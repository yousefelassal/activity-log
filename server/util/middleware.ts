import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt, { Secret } from 'jsonwebtoken';
import config from './config';
import db from './db';

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

interface Req extends Request {
  token?: object
}

export function extractToken(req: Req, res: Response, next: NextFunction) {
  const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(authorization.substring(7), config.SECRET as Secret)
        if (typeof decodedToken === 'object') {
          req.token = decodedToken
        }
      } catch{
        return res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}