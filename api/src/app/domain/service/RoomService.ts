import { Notification } from "./../../application/notification/Notification";
import { Injectable } from "decorated-router";
import * as crypto from 'crypto-js';
import { RoomRepository } from "./../../infra/repository/RoomRepository";
import { Room } from "../entity/Room";
import { RoomDto } from "../dto/RoomDto";
import { UserDto } from "../dto/UserDto";


@Injectable()
export class RoomService {
    constructor(
        private roomRepository: RoomRepository,
    ) { }

    public async createRoom(userId: number): Promise<Notification> {
        let notification = new Notification();
        let code: string = null;
        let game: Room = null;

        do {
            code = this.generateCode();
            game = await this.roomRepository.getRoomByCode(code);
        } while (game != null && code == null);

        let room = {
            id: null,
            game_code: code,
            player_one_id: userId,
            d_start: new Date(),
        } as Room;

        return this.roomRepository.Insert<Room>(room)
                .then((insertedId: number) => {
                    if (!!insertedId) {
                        return notification.Success();
                    } else {
                        return notification.addError('An error has occurred').Success(false)
                    }
                })
                .catch(err => notification.addError(err).Success(false));
    }

    public getRooms(pageStart: number, pageEnd: number): Promise<Notification<RoomDto[]>> {
        let notification = new Notification<RoomDto[]>();
        return this.roomRepository.getRooms(pageStart, pageEnd)
            .then((rooms: Room[]) => {
                let roomsDto = rooms.map(room => RoomDto.fromEntity(room));
                return notification.setResult(roomsDto);
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }

    private generateCode() {
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();

        return crypto.SHA1(current_date + random).toString().substring(0, 10).toUpperCase();
    }
}