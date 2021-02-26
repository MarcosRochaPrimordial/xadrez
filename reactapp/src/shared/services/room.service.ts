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

    public getRoom(roomId: number, userId?: number) {
        return Api.Get<Room>(`/room/${roomId}${!!userId ? `?userId=${userId}` : ''}`);
    }

    public verifyRoomCode(roomId: number, gameCode: string) {
        let url = `/room/code/${roomId}/${gameCode}`;
        console.log(url);
        return Api.Get(url);
    }
}

export default new RoomService();