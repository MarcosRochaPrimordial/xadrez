import { DataObject } from "decorated-router";
import { GameMove } from "../entity/GameMove";
import { Mapper } from "../utils/Mapper";
import { PieceDto } from "./PieceDto";
import { RoomDto } from "./RoomDto";
import { UserDto } from "./UserDto";

@DataObject()
export class GameMoveDto {
    id?: number;
    pieceId?: number;
    piece: PieceDto;
    spot: string;
    dTime: Date;
    room?: RoomDto;
    user?: UserDto;

    public static fromEntity(entity: GameMove): GameMoveDto {
        if (!entity) {
            return null;
        }

        const gameMoveDto = Mapper.map<GameMoveDto>(entity, new GameMoveDto());
        gameMoveDto.pieceId = entity.piece_id;
        gameMoveDto.piece = {
            id: entity.piece.id,
            colored: entity.piece.colored,
            pieceName: entity.piece.piece_name,
            pieceCode: entity.piece.piece_code
        };
        gameMoveDto.dTime = entity.d_time;
        return gameMoveDto;
    }

    public toEntity(): GameMove {
        const gameMove = Mapper.map<GameMove>(this, new GameMove());
        gameMove.piece_id = this.pieceId;
        gameMove.piece = {
            id: this.piece.id,
            colored: this.piece.colored,
            piece_name: this.piece.pieceName,
            piece_code: this.piece.pieceCode
        };
        gameMove.d_time = this.dTime;
        return gameMove;
    }
}