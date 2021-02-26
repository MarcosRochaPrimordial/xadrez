import { Room } from '../../core/models/Room';
import Api from './api';
import UserStorage from './user.storage';

class RoomService {
    public createRoom() {
        return Api.Post<Room>('/room', { id: UserStorage.getUser().id });
    }

    public getRooms(startPage: number, endPage: number, searchWord: string = '') {
        return Api.Get<Room[]>(`/room/page/${startPage}/${endPage}${!!searchWord ? `?search=${searchWord}` : ''}`);
    }

    public getRoomAndApply(roomId: number, userId?: number) {
        return Api.Get<Room>(`/room/apply/${roomId}${!!userId ? `?userId=${userId}` : ''}`);
    }

    public verifyRoomCode(roomId: number, gameCode: string) {
        return Api.Get(`/room/code/${roomId}/${gameCode}`);
    }
}

export default new RoomService();