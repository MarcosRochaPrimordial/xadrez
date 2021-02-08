import * as jwt from 'jsonwebtoken';
import { environment } from '../../../environment';

export class Security {
    public static sign(word: string, expiresIn: number): string {
        return jwt.sign({ word }, environment.security.token, {
            expiresIn
        });
    }

    public static verify(token: string) {
        return jwt.verify(token, environment.security.token);
    }
}