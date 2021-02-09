export class HttpService {
    BASE = 'http://api';

    Post(url, body) {
        return fetch(`${this.BASE}${url}`, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
}