import { LoginController } from './app/application/controller/LoginController';
import { App } from 'decorated-router';
import { RoomController } from './app/application/controller/RoomController';
import { GameMoveController } from './app/application/controller/GameMoveController';

@App({
    controllers: [
        LoginController,
        RoomController,
        GameMoveController
    ],
    server: {
        port: 3300,
        methods: ['GET', 'POST', 'PUT'],
        headers: ['ORIGIN', 'X-Requested-With', 'Content-type', 'Accept', 'Authorization']
    }
})
class Loader { }