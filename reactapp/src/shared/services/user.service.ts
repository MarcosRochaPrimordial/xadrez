import { ResultNotification } from '../../core/models/ResultNotification';
import { User } from '../../core/models/User';
import Api from './api';

class UserService {
    public signUp(params: User): Promise<ResultNotification<User>> {
        return Api.Post<User>('/login/signup', params);
    }

    public login(params: User): Promise<ResultNotification<User>> {
        return Api.Post<User>('/login', params);
    }
}

export default new UserService();