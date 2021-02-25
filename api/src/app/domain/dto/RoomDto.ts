import { DataObject } from "decorated-router";
import { Room } from "../entity/Room";
import { User } from "../entity/User";
import { Mapper } from "../utils/Mapper";

@DataObject()
export class RoomDto {
    id: number = null;
    gameCode: string;
    playerOne: User;
    playerOneId: number;
    playerTwo: User;
    playerTwoId: number;
    dStart: Date;

    public static fromEntity(entity: Room): RoomDto {
        if (!entity) {
            return null;
        }

        const roomDto = Mapper.map<RoomDto>(entity, new RoomDto());
        roomDto.gameCode = entity.game_code;
        roomDto.playerOne = entity.player_one;
        roomDto.playerOneId = entity.player_one_id;
        roomDto.playerTwo = entity.player_two;
        roomDto.playerTwoId = entity.player_two_id;
        roomDto.dStart = entity.d_start;
        return roomDto;
    }

    public toEntity(): Room {
        const room = Mapper.map<Room>(this, new Room());
        room.game_code = this.gameCode;
        room.player_one = this.playerOne;
        room.player_one_id = this.playerOneId;
        room.player_two = this.playerTwo;
        room.player_two_id = this.playerTwoId;
        room.d_start = this.dStart;
        return room;
    }
}