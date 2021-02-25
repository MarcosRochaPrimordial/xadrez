import { Security } from './Security';
import { Request, Response, NextFunction } from 'express';

export function Authentication(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({errors: ['Token not sent']});
        }
        
        if (!Security.verify(token)) {
            return res.status(401).send({errors: ['Token invalid']});
        }

        next();
    }
}