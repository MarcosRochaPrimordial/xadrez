import { ResultNotification } from '../../core/models/ResultNotification';
import { User } from '../../core/models/User';
import UserService from './user.service';

class Auth {
    authenticated: boolean = false;

    login(body: User): Promise<ResultNotification<User>> {
        return new Promise((resolve, reject) => {
            UserService.login(body)
                .then(response => {
                    if (response.success) {
                        UserService.setUser(response.result);
                        this.authenticated = true;
                    }
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();