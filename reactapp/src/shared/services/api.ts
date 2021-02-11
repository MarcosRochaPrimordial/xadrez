import { ResultNotification } from '../../core/models/ResultNotification';

export default class Api {
    private static BASE: string = 'http://localhost:3300';

    public static Post<T>(endpoint: string, body: any): Promise<ResultNotification<T>> {
        return new Promise((resolve, reject) => {
            fetch(`${this.BASE}${endpoint}`, {
                method: 'POST',
                body
            })
                .then((response) => resolve(response.json()))
                .catch(err => reject(err));
        });
    }
}