import axios from 'axios';
import { ResultNotification } from '../../core/models/ResultNotification';

class Api {
    private api = axios.create({
        baseURL: 'http://localhost:3300'
    });

    public Post<T>(endpoint: string, body: any): Promise<ResultNotification<T>> {
        return new Promise((resolve, reject) => {
            this.api.post<any, any>(endpoint, body, {
                headers: {
                    'Accept': 'text/plain; application/json',
                    'Content-Type': 'text/plain; application/json',
                }
            })
                .then(response => resolve(response.data as ResultNotification<T>))
                .catch(err => reject(err));
        });
    }
}

export default new Api();