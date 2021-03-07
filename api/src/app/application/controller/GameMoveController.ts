import { Authentication } from "./../../infra/configs/Authentication";
import { Body, Controller, Get, Put, Query } from "decorated-router";
import { GameMoveService } from "./../../domain/service/GameMoveService";
import { GameMoveRequest } from "app/domain/dto/GameMoveRequest";

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

    @Put()
    setPieceNewPosition(@Body() moveRequest: GameMoveRequest) {
        return this.gameMoveService.setPiece(moveRequest);
    }
}