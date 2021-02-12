import { ResultNotification } from '../../core/models/ResultNotification';

class Api {
    private BASE: string = 'http://localhost:3300';
    private headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    };

    public Post<T>(endpoint: string, body: any): Promise<ResultNotification<T>> {
        return new Promise((resolve, reject) => {
            fetch(`${this.BASE}${endpoint}`, {
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((response) => resolve(response.json()))
                .catch(err => reject(err));
        });
    }
}

export default new Api();