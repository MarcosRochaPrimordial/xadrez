import { ResultNotification } from '../../core/models/ResultNotification';
import { User } from '../../core/models/User';
import UserService from './user.service';

class Auth {
    get authenticated(): boolean {
        return UserService.userExists;
    }

    login(body: User): Promise<ResultNotification<User>> {
        return new Promise((resolve, reject) => {
            UserService.login(body)
                .then(response => {
                    if (response.success) {
                        UserService.setUser(response.result);
                    }
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    logout() {
        UserService.clearUser();
    }
}

export default new Auth();