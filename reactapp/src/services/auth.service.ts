import { User } from '../models/User';
import api from './api';

class Auth {
    authenticated: boolean = false;

    login(body: User, callback: Function) {
        api.post('/login', body)
            .then(response => {
                if (!!response) {
                    console.log(response);
                    this.authenticated = true;
                    callback();
                }
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