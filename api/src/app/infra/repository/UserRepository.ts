import { User } from "./../../domain/entity/User";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository {
    constructor() {
        super('user');
    }

    public getUserByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.Query<User[]>('SELECT id, username, password FROM user WHERE username = ?', [username])
                .then((users: User[]) => {
                    if (!!users.length) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => reject(err));
        });
    }
}