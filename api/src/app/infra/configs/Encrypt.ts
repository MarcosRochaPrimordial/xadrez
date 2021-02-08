import * as bcrypt from 'bcryptjs';

export class Encrypt {
    public static genHash(word: string): string {
        return bcrypt.hashSync(word, this.genSalt(10));
    }

    public static compareHash(word1: string, word2: string): boolean {
        return bcrypt.compareSync(word1, word2);
    }

    public static genSalt(length: number): string {
        return bcrypt.genSaltSync(length);
    }
}