import { Notification } from "./../../application/notification/Notification";
import { Injectable } from "decorated-router";
import * as crypto from 'crypto-js';
import { RoomRepository } from "./../../infra/repository/RoomRepository";
import { Room } from "../entity/Room";
import { RoomDto } from "../dto/RoomDto";
import { GameMoveService } from "./GameMoveService";


@Injectable()
export class RoomService {
    constructor(
        private roomRepository: RoomRepository,
        private gameMoveService: GameMoveService,
    ) { }

    public async createRoom(userId: number): Promise<Notification<Room>> {
        let notification = new Notification<Room>();
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
                        room.id = insertedId;
                        this.gameMoveService.setInitialPosition(userId, room.id);
                        return notification.setResult(room);
                    } else {
                        return notification.addError('An error has occurred').Success(false)
                    }
                })
                .catch(err => notification.addError(err).Success(false));
    }

    public getRooms(pageStart: number, pageEnd: number, search: string = null): Promise<Notification<RoomDto[]>> {
        let notification = new Notification<RoomDto[]>();
        return this.roomRepository.getRooms(pageStart, pageEnd, search)
            .then((rooms: Room[]) => {
                let roomsDto = rooms.map(room => RoomDto.fromEntity(room));
                return notification.setResult(roomsDto);
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }

    public getRoomByIdValidateUser(roomId: number, userId: number = null): Promise<Notification<RoomDto>> {
        let notification = new Notification<RoomDto>();
        return this.roomRepository.getRoomByIdValidateUser(roomId, userId)
            .then((room: Room) => {
                if (!!room) {
                    let roomDto = RoomDto.fromEntity(room);
                    if (room.player_one.id !== userId) {
                        return this.roomRepository.setPlayer2ToUser(roomId, userId)
                            .then((rows: number) => {
                                roomDto.playerTwo.id = userId;
                                return notification.setResult(roomDto);
                            })
                            .catch(err => notification.addError('An error has occurred').Success(false));
                    } else {
                        return notification.setResult(roomDto);
                    }
                } else {
                    return notification.setResult(null);
                }
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }

    public async verifyRoomCode(roomId: number, gameCode: string): Promise<Notification> {
        let notification = new Notification();
        return this.roomRepository.verifyRoomCode(roomId, gameCode)
            .then((room: Room) => {
                if (room !== null) {
                    return notification.Success(true);
                } else {
                    return notification.Success(false);
                }
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }

    private generateCode() {
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();

        return crypto.SHA1(current_date + random).toString().substring(0, 10).toUpperCase();
    }
}