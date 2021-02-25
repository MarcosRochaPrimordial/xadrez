import { ResultNotification } from '../../core/models/ResultNotification';
import { User } from '../../core/models/User';
import UserStorage from './user.storage';
import UserService from './user.service';

class Auth {
    get authenticated(): boolean {
        return UserStorage.userExists;
    }

    login(body: User): Promise<ResultNotification<User>> {
        return new Promise((resolve, reject) => {
            UserService.login(body)
                .then(response => {
                    if (response.success) {
                        UserStorage.setUser(response.result);
                    }
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    logout() {
        UserStorage.clearUser();
    }
}

export default new Auth();