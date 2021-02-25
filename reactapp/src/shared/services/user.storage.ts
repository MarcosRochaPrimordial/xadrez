import { User } from './../../core/models/User';

class UserStorage {
    private LOGGED_USER = 'logged_user';
    get userExists(): boolean {
        return !!this.getUser() && !!this.getUser().token;
    }

    public setUser(user: User) {
        sessionStorage.setItem(this.LOGGED_USER, JSON.stringify(user));
    }

    public getUser(): User {
        return JSON.parse(sessionStorage.getItem(this.LOGGED_USER) || '{}');
    }

    public clearUser() {
        sessionStorage.removeItem(this.LOGGED_USER);
    }
}

export default new UserStorage();