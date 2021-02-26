import { RoomDto } from "./RoomDto";

export interface RoomRequest {
    rooms: RoomDto[],
    totalItens: number;
}