import { User } from "../models/User";

export class UserService {
    set user(user: User) {
        localStorage.setItem('logged_user', JSON.stringify(user));
    }

    get user(): User {
        return JSON.parse(localStorage.getItem('logged_user') || '{}');
    }
}