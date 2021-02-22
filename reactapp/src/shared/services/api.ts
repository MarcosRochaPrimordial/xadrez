import axios from 'axios';
import store from './../../core/store';
import { LoadingTypes } from './../../core/store/ducks/Loading/types'
import { ResultNotification } from '../../core/models/ResultNotification';

class Api {
    private api = axios.create({
        baseURL: 'http://localhost:3300'
    });

    constructor() {
        this.api.interceptors.request.use(
            config => {
                config.headers = {
                    'Content-Type': 'application/json',
                }
                return config;
            }
        )
    }

    public Post<T>(endpoint: string, body: any): Promise<ResultNotification<T>> {
        store.dispatch({ type: LoadingTypes.SHOW });
        return new Promise((resolve, reject) => {
            this.api.post<any, any>(endpoint, body)
                .then(response => resolve(response.data as ResultNotification<T>))
                .catch(err => reject(err))
                .finally(() => store.dispatch({ type: LoadingTypes.HIDE }));
        });
    }
}

export default new Api();