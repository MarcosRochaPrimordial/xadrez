import { Body, Controller, Get, Path, Post } from "decorated-router";
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

    @Get('/:start/:end')
    getRooms(@Path('start') start: number, @Path('end') end: number) {
        return this.roomService.getRooms(start, end);
    }
}