import { Body, Controller, Get, Path, Post, Query } from "decorated-router";
import { RoomService } from "./../../domain/service/RoomService";
import { Authentication } from "./../../infra/configs/Authentication";
import { UserDto } from "./../../domain/dto/UserDto";

@Controller({
    url: '/room',
    cors: '*',
    auth: Authentication
})
export class RoomController {

    constructor(
        private roomService: RoomService,
    ) { }

    @Post()
    createRoom(@Body() userDto: UserDto) {
        return this.roomService.createRoom(userDto.id);
    }

    @Get('/:roomId')
    getRoom(@Path('roomId') roomId: number, @Query('userId') userId: number = null) {
        return this.roomService.getRoomByIdValidateUser(roomId, userId);
    }

    @Get('/page/:start/:end')
    getRooms(@Path('start') start: number, @Path('end') end: number, @Query('search') search: string = null) {
        return this.roomService.getRooms(start, end, search);
    }

    @Get('/code/:roomId/:gameCode')
    verifyRoomCode(@Path('roomId') roomId: number, @Path('gameCode') gameCode: string) {
        return this.roomService.verifyRoomCode(roomId, gameCode);
    }
}