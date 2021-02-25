import { LoginController } from './app/application/controller/LoginController';
import { App } from 'decorated-router';
import { RoomController } from './app/application/controller/RoomController';

@App({
    controllers: [
        LoginController,
        RoomController
    ],
    server: {
        port: 3300,
        methods: ['GET', 'POST'],
        headers: ['ORIGIN', 'X-Requested-With', 'Content-type', 'Accept', 'Authorization']
    }
})
class Loader { }