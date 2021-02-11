import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api:3300',
});

export default api;