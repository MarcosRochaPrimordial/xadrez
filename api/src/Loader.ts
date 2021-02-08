import { LoginController } from './app/application/controller/LoginController';
import { App, METHOD, HEADER } from 'decorated-router';

@App({
    controllers: [
        LoginController
    ],
    server: {
        port: 3300,
        methods: [METHOD.GET, METHOD.POST],
        headers: [HEADER.ORIGIN, HEADER.XREQUESTEDWITH, HEADER.CONTENTTYPE, HEADER.ACCEPT, HEADER.AUTHORIZATION]
    }
})
class Loader { }