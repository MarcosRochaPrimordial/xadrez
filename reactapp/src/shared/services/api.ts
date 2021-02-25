import axios from 'axios';
import store from './../../core/store';
import { LoadingTypes } from './../../core/store/ducks/Loading/types'
import { ResultNotification } from '../../core/models/ResultNotification';
import UserStorage from './user.storage';

class Api {
    private api = axios.create({
        baseURL: 'http://localhost:3300'
    });

    private insertHeaders() {
        const token = UserStorage.userExists ? UserStorage.getUser().token : null;
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        };
    }

    private loadingShow() {
        store.dispatch({ type: LoadingTypes.SHOW });
    }

    private loadingHide() {
        store.dispatch({ type: LoadingTypes.HIDE })
    }

    public Post<T>(endpoint: string, body: any = null): Promise<ResultNotification<T>> {
        this.loadingShow();
        return new Promise((resolve, reject) => {
            this.api.post<any, any>(endpoint, body, this.insertHeaders())
                .then(response => resolve(response.data as ResultNotification<T>))
                .catch(err => reject(err))
                .finally(() => this.loadingHide());
        });
    }

    public Get<T>(endpoint: string): Promise<ResultNotification<T>> {
        this.loadingShow();
        return new Promise((resolve, reject) => {
            this.api.get<any, any>(endpoint, this.insertHeaders())
                .then(response => resolve(response.data as ResultNotification<T>))
                .catch(err => reject(err))
                .finally(() => this.loadingHide());
        })
    }
}

export default new Api();