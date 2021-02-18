import { ResultNotification } from '../../core/models/ResultNotification';
import { User } from '../../core/models/User';
import Api from './api';

class UserService {
    private LOGGED_USER = 'logged_user';
    public setUser(user: User) {
        sessionStorage.setItem(this.LOGGED_USER, JSON.stringify(user));
    }

    public getUser(): User {
        return JSON.parse(sessionStorage.getItem(this.LOGGED_USER) || '{}');
    }

    public clearUser() {
        sessionStorage.removeItem(this.LOGGED_USER);
    }

    public signUp(params: User): Promise<ResultNotification<User>> {
        return Api.Post<User>('/login/signup', params);
    }

    public login(params: User): Promise<ResultNotification<User>> {
        return Api.Post<User>('/login', params);
    }
}

export default new UserService();