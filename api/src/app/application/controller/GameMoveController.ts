import { Authentication } from "./../../infra/configs/Authentication";
import { Controller, Get, Query } from "decorated-router";
import { GameMoveService } from "./../../domain/service/GameMoveService";

@Controller({
    url: '/piece',
    cors: '*',
    auth: Authentication
})
export class GameMoveController {

    constructor(
        private gameMoveService: GameMoveService
    ) { }

    @Get()
    getPieces(@Query('roomId') roomId: number) {
        return this.gameMoveService.getPieces(roomId);
    }
}