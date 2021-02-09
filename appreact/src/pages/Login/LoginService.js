import { HttpService } from "../../services/HttpService";

export class LoginService {
    BASE_LOGIN = '/login';

    constructor() {
        this.http = new HttpService();
    }

    signIn(body) {
        return this.http.Post(this.BASE_LOGIN, body);
    }

    signUp(body) {
        return this.http.Post(`${this.BASE_LOGIN}/signup`, body);
    }
}