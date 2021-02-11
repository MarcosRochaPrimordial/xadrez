import { User } from '../../core/models/User';
import Api from './api';

class Auth {
    authenticated: boolean = false;

    signin(body: User, callback: Function) {
        Api.Post('/login/signup', body)
            .then(response => {
                callback(response.success);
            })
            .catch(err => console.log(err));
    }

    login(body: User, callback: Function) {
        Api.Post('/login', body)
            .then(response => {
                if (response.success) {
                    this.authenticated = true;
                }
                callback(response.success);
            })
            .catch(err => console.log(err));
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();